import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
const timestamp = '2025-03-21T18:30:00.000Z';
const date = new Date(timestamp);
const formattedDate = date.toISOString().split('T')[0];

export default function ExpensesList() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/expenses/`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const getData = () => {
        axios.get(`http://localhost:5000/expenses/`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:5000/expenses/${id}`).then(response => {
            console.log(response.status)


            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Expense has been deleted!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })
                getData();
            }

            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Package has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
    }

    const setData = (data) => {
        let { _id, shopId, shopName, rentAmount, waterBill, currentBill, salaryExpense, date } = data;

        localStorage.setItem('Id', _id);
        localStorage.setItem('ShopId', shopId);
        localStorage.setItem('ShopName', shopName);
        localStorage.setItem('RentAmount', rentAmount);
        localStorage.setItem('WaterBill', waterBill);
        localStorage.setItem('CurrentBill', currentBill);
        localStorage.setItem('SalaryExpense', salaryExpense);
        localStorage.setItem('Date', date);
    }


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((data) => {
                return Object.values(data).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }

    // shopId
    // shopName
    // rentAmount
    // waterBill
    // currentBill
    // salaryExpense
    // date
    const exportPackages = () => {
        console.log("Export PDF")
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Package List Report ";
        const headers = [["Shop ID", "Shop Namme", "Rent Amount", "Water Bill", "Current Bill", "Salary Expenses", "Date"]];

        const pack = APIData.map(
            data => [
                data.shopId,
                data.shopName,
                data.rentAmount,
                data.waterBill,
                data.currentBill,
                data.salaryExpense,
                data.date
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: pack
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Expenses Report.pdf")
    }

    return (
        <div>
            <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>
                                        <th className='drop-shadow-md'><h1>Expenses Management Dashboard</h1></th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/addExpenses"}>
                                                        Add new Shop
                                                    </Link></button>
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={exportPackages}>
                                                    Download Report Here
                                                </button>
                                            </div>

                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    required
                                                    icon='search'
                                                    placeholder='Search'
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-lg text-left text-gray-500 dark:text-gray-400'>
                                    <thead className='p-5 text-s text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Shop ID</th>
                                            <th className="p-2 tbhead">Shop Name</th>
                                            <th className="p-2 tbhead">Rent Amount</th>
                                            <th className="p-2 tbhead">Water expenses</th>
                                            <th className="p-2 tbhead">Electricity expenses</th>
                                            <th className="p-2 tbhead">Salary expenses</th>
                                            <th className="p-2 tbhead">Date</th>
                                            <th className="p-2 tbhead">Update</th>
                                            <th className="p-2 tbhead">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* search list */}
                                        {searchInput.length > 1 ? (
                                            filteredResults.map((data) => {
                                                if (searchInput) {
                                                    return (
                                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                            <td className='px-6 py-4'>{data.shopId}</td>
                                                            <td className='px-6 py-4'>{data.shopName}</td>
                                                            <td className='px-6 py-4'>{data.rentAmount}</td>
                                                            <td className='px-6 py-4'>{data.waterBill}</td>
                                                            <td className='px-6 py-4'>{data.currentBill}</td>
                                                            <td className='px-6 py-4'>{data.salaryExpense}</td>
                                                            <td className='px-6 py-4'>{formattedDate}</td>
                                                            <td className='px-6 py-4'>
                                                                <div class="flex justify-center">
                                                                    <div class="">

                                                                        <Link to='/edit'><button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => setData(data)}>
                                                                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                                <div class="">
                                                                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                                                    </svg>
                                                                                </div>
                                                                                <div class="">
                                                                                    Update
                                                                                </div>
                                                                            </div>
                                                                        </button></Link>
                                                                    </div></div></td>

                                                            <td className='px-6 py-4'>
                                                                <div class="flex justify-center">
                                                                    <div class="">

                                                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => onDelete(data._id)}>
                                                                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                                <div class="">
                                                                                    <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                </div>
                                                                                <div class="">
                                                                                    Delete
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div></div></td>

                                                        </tr>
                                                    )
                                                }
                                            })
                                        ) : (
                                            APIData.map((data) => {

                                                return (
                                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                        <td className='px-6 py-4'>{data.shopId}</td>
                                                        <td className='px-6 py-4'>{data.shopName}</td>
                                                        <td className='px-6 py-4'>{data.rentAmount}</td>
                                                        <td className='px-6 py-4'>{data.waterBill}</td>
                                                        <td className='px-6 py-4'>{data.currentBill}</td>
                                                        <td className='px-6 py-4'>{data.salaryExpense}</td>
                                                        <td className='px-6 py-4'>{formattedDate}</td>
                                                        <td className='px-6 py-4'>
                                                            <div class="flex justify-center">
                                                                <div class="">

                                                                    <Link to='/editExpenses'><button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => setData(data)}>
                                                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                            <div class="">
                                                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                                                </svg>
                                                                            </div>
                                                                            <div class="">
                                                                                Update
                                                                            </div>
                                                                        </div>
                                                                    </button></Link>
                                                                </div></div></td>

                                                        <td className='px-6 py-4'>
                                                            <div class="flex justify-center">
                                                                <div class="">

                                                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => onDelete(data._id)}>
                                                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                            <div class="">
                                                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="">
                                                                                Delete
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                </div></div></td>

                                                    </tr>
                                                )

                                            })
                                        )}
                                    </tbody>


                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}