import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default function EditExpenses() {

    // shopId,
    //     shopName,
    //     rentAmount,
    //     waterBill,
    //     currentBill,
    //     salaryExpense,
    //     date

    const [id, setID] = useState(null);
    // const [packageId, setPackageId] = useState('');
    // const [item, setItem] = useState('');
    // const [category, setCategory] = useState('');
    // const [specialNotes, setSpecialNotes] = useState('');
    // const [acceptedDate, setAcceptedDate] = useState('');
    // const [acceptedTime, setAcceptedTime] = useState('');
    // const [customerName, setcustomerName] = useState('');
    // const [address, setAddress] = useState('');
    // const [phone, setPhone] = useState('');
    // const [lostAndFound, setLostAndFound] = useState('');
    // const [lostPlace, setLostPlace] = useState('');
    // const [lostDate, setLostDate] = useState('');
    // const [lostTime, setLostTime] = useState('');

    const [shopId, setshopId] = useState('');
    const [shopName, setshopName] = useState('');
    const [rentAmount, setrentAmount] = useState('');
    const [waterBill, setwaterBill] = useState('');
    const [currentBill, setcurrentBill] = useState('');
    const [salaryExpense, setsalaryExpense] = useState('');
    // const [date, setdate] = useState('');
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        setID(localStorage.getItem('Id'))
        setshopId(localStorage.getItem('ShopId'))
        setshopName(localStorage.getItem('ShopName'))
        setrentAmount(localStorage.getItem('RentAmount'))
        setwaterBill(localStorage.getItem('WaterBill'))
        setcurrentBill(localStorage.getItem('CurrentBill'))
        setsalaryExpense(localStorage.getItem('SalaryExpense'))
        setStartDate(localStorage.getItem('Date'))

        console.log("View expenses id" + setID(localStorage.getItem('Id')));
    }, []);


    const showErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            color: '#f2220f',
            background: '#fff',
            showConfirmButton: true,
            confirmButtonText: 'Okay',
            confirmButtonColor: '#f2220f',
            iconColor: '#60e004',
            timer: 2800
        });
    };

    const updateAPIData = (e) => {
        e.preventDefault();
        const expenses = {
            shopId: shopId,
            shopName: shopName,
            rentAmount: rentAmount,
            waterBill: waterBill,
            currentBill: currentBill,
            salaryExpense: salaryExpense,
            date: startDate,
        };

        const errors = [];

        if (shopName.length <= 3) {
            errors.push("Shop Name length is too short");
        }
        if (rentAmount <= 0) {
            errors.push("Rent Amount should be greater than 0");
        }
        if (waterBill <= 0) {
            errors.push("Water Bill should be greater than 0");
        }
        if (currentBill <= 0) {
            errors.push("Current Bill should be greater than 0");
        }
        if (salaryExpense <= 0) {
            errors.push("Salary Expense should be greater than 0");
        }
        if (startDate === null || startDate === undefined) {
            errors.push("Date is required");
        }

        if (errors.length > 0) {
            showErrorAlert(errors.join('<br>'));
        } else {
            axios.put(`http://localhost:5000/expenses/${id}`, expenses)
                .then(res => {
                    console.log(res.status);

                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'exE has been Updated!!',
                            background: '#fff',
                            showConfirmButton: true,
                            confirmButtonText: 'Okay',
                            confirmButtonColor: '#0712e0',
                            iconColor: '#60e004',
                            timer: 2800
                        }).then(() => {
                            window.location = '/expenses';
                        });

                        // window.location = '/expenses';
                    } else {
                        showErrorAlert('Error in updating!');
                    }
                })
                .catch(error => {
                    showErrorAlert('Error in updating!');
                    console.error('Error updating package:', error);
                });
        }
    };

    const handleDate = (date) => {
        setStartDate(date)
        // Some logic
    }

    return (
        // <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
        //     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        //         <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        //             <div className='items-center overflow-hidden'>
        //                 <div className=''>
        //                     <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
        //                         <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
        //                             <div class="">
        //                                 <p className='text-4xl font-semibold text-black uppercase'>Update Package</p>
        //                                 <p />
        //                                 <div className='grid grid-cols-1 gap-4 form-group'><p className='text-2xl font-semibold uppercase text-blue'>Package Details</p></div>
        //                                 <p />
        //                                 <div className="grid grid-cols-1 gap-4 form-group">
        //                                     <div class="">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Package ID
        //                                         </label>
        //                                         <input type="text"
        //                                             required
        //                                             readOnly
        //                                             className="form-control"
        //                                             value={packageId}
        //                                         // onChange={(e) => setPackageId(e.target.value)}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <p />
        //                                 <div className="grid grid-cols-2 gap-4 form-group">
        //                                     <div className="form-group">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Item
        //                                         </label>
        //                                         <input type="text"
        //                                             required
        //                                             className="form-control"
        //                                             value={item}
        //                                             onChange={(e) => setItem(e.target.value)}
        //                                         />
        //                                     </div>
        //                                     <div class="">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
        //                                             Category
        //                                         </label>
        //                                         <select
        //                                             type="text"
        //                                             required
        //                                             value={category}
        //                                             className="form-control"
        //                                             onChange={(e) => setCategory(e.target.value)}
        //                                         >
        //                                             <option>Select From Here</option>
        //                                             <option>Breakable Items</option>
        //                                             <option>Electronics</option>
        //                                             <option>Food Items</option>
        //                                             <option>Freezer Items</option>
        //                                             <option>Flowers</option>
        //                                         </select>
        //                                     </div>
        //                                 </div>
        //                                 <p />
        //                                 <div className="grid grid-cols-1 gap-4 form-group">
        //                                     <div className="">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Special Notes
        //                                         </label>
        //                                         <textarea type="text"
        //                                             className="form-control"
        //                                             value={specialNotes}
        //                                             onChange={(e) => setSpecialNotes(e.target.value)}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <p />
        //                                 <div className="grid grid-cols-2 gap-4 form-group">
        //                                     <div class="form-group">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
        //                                             Accepted Date
        //                                         </label>
        //                                         <input type="text"
        //                                             readOnly
        //                                             className="form-control"
        //                                             value={acceptedDate.substring(0, 10)}
        //                                             onChange={(e) => setAcceptedDate(e.target.value)}
        //                                         />
        //                                     </div>
        //                                     <div className="">
        //                                         <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Accepted Time
        //                                         </label>
        //                                         <input type="text"
        //                                             readOnly
        //                                             className="form-control"
        //                                             value={acceptedTime}
        //                                             onChange={(e) => setAcceptedTime(e.target.value)}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <p /><p />
        //                                 <div className='grid grid-cols-1 gap-4 form-group'><p className='text-2xl font-semibold uppercase text-blue'>Customer Details</p></div>
        //                                 <p />
        //                                 <div className="grid grid-cols-2 gap-4 form-group">
        //                                     <div className="form-group">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Customer Name
        //                                         </label>
        //                                         <input type="text"
        //                                             className="form-control"
        //                                             value={customerName}
        //                                             onChange={(e) => setcustomerName(e.target.value)}
        //                                         />
        //                                     </div>
        //                                     <div class="">
        //                                         <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
        //                                             Delivery Address
        //                                         </label>
        //                                         <input type="text"
        //                                             className="form-control"
        //                                             value={address}
        //                                             onChange={(e) => setAddress(e.target.value)}
        //                                         />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Phone Number
        //                                         </label>
        //                                         <input type="text"
        //                                             className="form-control"
        //                                             value={phone}
        //                                             onChange={(e) => setPhone(e.target.value)}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <p /><p />
        //                                 <div className='grid grid-cols-1 gap-4 form-group'><p className='text-2xl font-semibold uppercase text-blue'>Lost And Found Details</p></div>
        //                                 <p />
        //                                 <div className="grid grid-cols-2 gap-4 form-group">
        //                                     <div className="form-group">
        //                                         <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Lost And Found
        //                                         </label>
        //                                         <select
        //                                             type="text"
        //                                             required
        //                                             value={lostAndFound}
        //                                             className="form-control"
        //                                             onChange={(e) => setLostAndFound(e.target.value)}
        //                                         >

        //                                             <option>Select From Here</option>
        //                                             <option>Lost</option>
        //                                             <option>Found</option>


        //                                         </select>
        //                                     </div>
        //                                     <div className="">
        //                                         <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Lost Place
        //                                         </label>
        //                                         <input
        //                                             type="text"
        //                                             className="form-control"
        //                                             value={lostPlace}
        //                                             onChange={(e) => setLostPlace(e.target.value)}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <p />
        //                                 <div className="grid grid-cols-2 gap-4 form-group">
        //                                     <div className="form-group">
        //                                         <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Lost Date
        //                                         </label>
        //                                         <DatePicker
        //                                             viewBox="0 0 20 40"
        //                                             dateFormat="MMMM d, yyyy"
        //                                             selected={new Date()}
        //                                             onChange={handleDate}
        //                                         />
        //                                     </div>
        //                                     <div className="">
        //                                         <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
        //                                             Lost Time
        //                                         </label>
        //                                         <input
        //                                             type="time"
        //                                             className="form-control"
        //                                             value={lostTime}
        //                                             onChange={(e) => setLostTime(e.target.value)}
        //                                         />
        //                                     </div>
        //                                 </div>

        //                                 <div className="text-center align-middle form-group">
        //                                     <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Package" onClick={updateAPIData} />
        //                                 </div>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Create Expense</p>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Shop Name
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    placeholder='Enter shop name'
                                                    value={shopName}
                                                    onChange={(e) => setshopName(e.target.value)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                    Date
                                                </label>
                                                <DatePicker
                                                    viewBox="0 0 20 40"
                                                    dateFormat="MMMM ,dd, yyyy"
                                                    // selected={startDate} // Use startDate as selected value
                                                    selected={new Date()}
                                                    onChange={(date) => setStartDate(date)} // Use setStartDate to update the selected date
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Electricity Amount
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    placeholder='Enter Electricity Amount'
                                                    value={currentBill}
                                                    onChange={(e) => setcurrentBill(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Water Amount
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    placeholder='Enter Water Amount'
                                                    value={waterBill}

                                                    onChange={(e) => setwaterBill(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Salary Amount
                                                </label>
                                                <input type="number"
                                                    required
                                                    value={salaryExpense}

                                                    className="form-control"
                                                    placeholder='Enter Salary Amount'
                                                    onChange={(e) => setsalaryExpense(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Rent Amount
                                                </label>
                                                <input type="number"
                                                    required
                                                    value={rentAmount}
                                                    step="0.01" // Allows input of decimal values with a precision of two decimal places

                                                    className="form-control"
                                                    placeholder='Enter Rent Amount'
                                                    onChange={(e) => setrentAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <p />

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create" onClick={updateAPIData} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}