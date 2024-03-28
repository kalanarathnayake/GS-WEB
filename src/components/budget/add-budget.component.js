import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

export default function AddPackage() {
    const [budgetName, setBudgetName] = useState('');
    const [department, setDepartment] = useState('');
    const [cost, setCost] = useState('');

    const postData = (e) => {
        e.preventDefault();
        const budget = {
            budgetName: budgetName,
            department: department,
            cost: cost,
        }
        console.log(budget);
        if (budget.budgetName.length <= 3 || !budget.department) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Budget name length is too short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000
            })
        } else if (budget.cost.length <= 1 || !budget.cost) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Add a valid amont',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000
            })
        }
        else if (budget.department.length <= 4 || !budget.department) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Department name is too short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000
            })
        }
        else {
            axios.post('http://localhost:5000/budget/add',
                budget,
            ).then(res => {
                console.log(res);
                if (res.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Budget has been added!',
                        background: '#fff',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#0712e0',
                        iconColor: '#60e004',
                        timer: 2800000
                    }).then(() => {
                        window.location = '/budget';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#f2220f',
                        iconColor: '#60e004',
                        timer: 2800000
                    })
                }
            })
        }
    }

    return (
        <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Create Budget</p>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Budget Name
                                                </label>
                                                <input type="text"
                                                    placeholder='Please Enter Name'
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setBudgetName(e.target.value)}
                                                />
                                            </div>
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                    Department
                                                </label>
                                                <input type="text"
                                                    placeholder='Please Enter Department Name'
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="grid grid-cols-1 gap-4 form-group">
                                            <div className="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Amount
                                                </label>
                                                <input type="number"
                                                    placeholder='Please Enter Amount'
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setCost(e.target.value)}
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