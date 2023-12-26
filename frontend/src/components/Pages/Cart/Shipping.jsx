import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../../actions/cartAction'
import { Country, State } from "country-state-city"
import { useAlert } from 'react-alert'
import CheckOutSteps from "./CheckOutSteps.jsx"
import { useNavigate } from 'react-router-dom'
import MetaData from '../../layout/MetaData'

const Shipping = () => {
    <MetaData title="Shipping" />
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phoneNumber.length !== 10){
            alert.error("Phone Number should be of 10 Digits");
            return;
        }

        dispatch(saveShippingInfo({address , city , state , country , pinCode , phoneNumber}));
        navigate("/order/confirm");
    }


    return (
        <Fragment>
            <CheckOutSteps activeStep = {0} />
            <div>
                <form
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                    className='flex flex-col w-60 mx-auto gap-8 my-12'
                >
                    <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
                    <input type="number" placeholder='Pin Code' required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                    <input type="number" placeholder='Phone Number' required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Country</option>
                        {Country &&
                            Country.getAllCountries().map((item) => {
                                return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            })}
                    </select>
                    { country &&
                        <select required value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">State</option>
                            {State && 
                                State.getStatesOfCountry(country).map((item) => {
                                    return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                })
                            }
                        </select>
                    }
                    <input type="submit" value="Continue" disabled = {state ? false : true} className='text-white' style={{backgroundColor: state ? "#F85903" : "red"}}/>
                </form>
            </div>
        </Fragment>
    )
}

export default Shipping