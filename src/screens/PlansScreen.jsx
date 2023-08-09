import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, query, getDocs, where, onSnapshot, addDoc } from "firebase/firestore";

import { UserAuth } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';



const PlansScreen = () => {
    const [products, setProducts] = useState([])
    const [subscription, setSubscription] = useState(null)

    const { user } = UserAuth()

    useEffect(  () => {
      
      const fetchProducts = async () => {

        const productsCollRef = query(collection(db, "products"), where("active", "==", true));

        const querySnapshot = await getDocs(productsCollRef);
        const products = {};
        querySnapshot.forEach( async (productDoc) => {
          // console.log( doc.data());
          products[productDoc.id] = await productDoc.data();
          const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
          // console.log(priceSnap)
            priceSnap.docs.forEach((price) => {
                products[productDoc.id].prices = {
                  priceId: price.id,
                  priceData: price.data()
                }
              })
              setProducts(products)
        });
      }
      fetchProducts()
      }, [])
      

    useEffect(() => {
      const fetchSubscriptiondata = async () => {

        const subscriptionCollRef = collection(db, "customers",`${user.uid}`,"subscriptions");
        const subsQuery = await getDocs(subscriptionCollRef)
        subsQuery.forEach(async (subs) => {
          setSubscription({
            role: subs.data().role,
            current_period_start: subs.data().current_period_start,
            current_period_end: subs.data().current_period_end,
            
          })
        })
      }
      fetchSubscriptiondata()
    }, [user.uid])
    console.log( subscription?.role)
      
    
    const loadCheckOutHandler =  async (priceId) => {
      const customersCollRef = collection(db, "customers",`${user.uid}`,"checkout_sessions");
      const docRef = await addDoc(customersCollRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          console.error(`An error occured: ${error.message}`);
        }
        if (sessionId) {
          const stripe =  await loadStripe('pk_test_51LxQNqLOUox2XOPGtDtIcWPTuubPdVj9smPVVPFvc48vWJ3Lcs8PkBRaqLBFI881jIrdkHMVyt8ygoFhdryOdNDx00yaiQHY9G')
          stripe.redirectToCheckout({sessionId});      
        }
    });
    // console.log(priceId)
  }
    
  return (
   
        
        <div className="fixed w-full px-16 py-20 z-50">
          <div className='bg-black/75 text-white max-w-[400px] h-[400px] mx-auto '>
            
            <h1 className='text-xl md:text-3xl  text-white p-4 my-4 mt-24 md:my-6 '>
              <span className='text-center text-sm text-red-600'>Hi {user?.email}</span> <br />
              Choose Subscription
            </h1>
            {Object.entries(products).map(([productId, productData]) => {
              const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

            return (
            <div key={productId} className='flex flex-wrap justify-between px-2 sm:px-6 my-4 md:my-6 opacity-50 hover:opacity-100'>
                <div >
                  <h4 className='text-lg md:text-xl'>{productData.name}</h4>
                  <h6>{productData.description}</h6>
                </div>
                <button 
                  onClick={() => !isCurrentPackage && loadCheckOutHandler(productData.prices.priceId)}
                  className={` ${isCurrentPackage && 'bg-green-600'} 
                  bg-red-600 hover:bg-gray-600 w-48  my-2 rounded text-white font-bold py-2 px-4 `}>
                  {isCurrentPackage ?  'Current Package' : 'Subscribe'}
                </button>

              </div>
            )  
            })}
          </div>


          
        </div>

    

  )
}

export default PlansScreen