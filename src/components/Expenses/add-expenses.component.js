import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
const shortid = require('shortid');

export default function AddExpense() {
    const [ShopId, setShopId] = useState('');
    const [ShopName, setShopName] = useState('');
    const [RentAmount, setRentAmount] = useState('');
    const [WaterBill, setWaterBill] = useState('');
    const [CurrentBill, setCurrentBill] = useState('');
    const [SalaryExpense, setSalatyExpenses] = useState('');
    const [startDate, setStartDate] = useState(new Date());


    const postData = (e) => {
        e.preventDefault();
        const generatedShopId = shortid.generate();

        const expenses = {
            shopId: generatedShopId,
            shopName: ShopName,
            rentAmount: RentAmount,
            waterBill: WaterBill,
            currentBill: CurrentBill,
            salaryExpense: SalaryExpense,
            date: startDate,
        };
        console.log("setting data ", expenses);

        const errors = [];

        if (ShopName.length <= 3) {
            errors.push("Shop Name length is too short");
        }
        if (RentAmount <= 0) {
            errors.push("Rent Amount should be greater than 0");
        }
        if (WaterBill <= 0) {
            errors.push("Water Bill should be greater than 0");
        }
        if (CurrentBill <= 0) {
            errors.push("Current Bill should be greater than 0");
        }
        if (SalaryExpense <= 0) {
            errors.push("Salary Expense should be greater than 0");
        }
        if (startDate === null || startDate === undefined) {
            errors.push("Data is required");
        }

        if (errors.length > 0) {
            showError(errors.join('<br>'));
        } else {
            axios.post('http://localhost:5000/expenses/add', expenses)
                .then(res => {
                    console.log(res);
                    if (res.status === 201) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Expense has been added!!',
                            background: '#fff',
                            showConfirmButton: true,
                            confirmButtonText: 'Okay',
                            confirmButtonColor: '#0712e0',
                            iconColor: '#60e004',
                            timer: 2800
                        }).then(() => {
                            window.location = '/expenses';
                        });
                    } else {
                        showError("Error in adding!");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showError("Error in adding!");
                });
        }
    }

    const showError = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: errorMessage,
            color: '#f2220f',
            background: '#fff',
            showConfirmButton: true,
            confirmButtonText: 'Okay',
            confirmButtonColor: '#f2220f',
            iconColor: '#60e004',
            timer: 2800
        });
    };

    return (
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
                                                    onChange={(e) => setShopName(e.target.value)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                    Created Date
                                                </label>
                                                <DatePicker
                                                    viewBox="0 0 20 40"
                                                    dateFormat="MMMM ,dd, yyyy"
                                                    // selected={startDate} // Use startDate as selected value
                                                    // selected={new Date()}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)} // Use setStartDate to update the selected date
                                                    closeOnScroll={(e) => e.target === document}
                                                />
                                                
                                            </div>

                                            {/* <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                    Category
                                                </label>
                                                <select
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <option>Select From Here</option>
                                                    <option>Breakable Items</option>
                                                    <option>Electronics</option>
                                                    <option>Food Items</option>
                                                    <option>Freezer Items</option>
                                                    <option>Flowers</option>
                                                </select>
                                            </div> */}
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
                                                    placeholder='Enter shop name'
                                                    onChange={(e) => setCurrentBill(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Water Amount
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    placeholder='Enter shop name'
                                                    onChange={(e) => setWaterBill(e.target.value)}
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
                                                    className="form-control"
                                                    placeholder='Enter shop name'
                                                    onChange={(e) => setSalatyExpenses(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Rent Amount
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    placeholder='Enter shop name'
                                                    onChange={(e) => setRentAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <p />

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create" onClick={postData} />
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