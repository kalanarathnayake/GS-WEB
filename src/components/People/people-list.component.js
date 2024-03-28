import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PeopleList() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [APIData, setAPIData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [birthdate, setBirthDate] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/people/`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const getData = () => {
        axios.get(`http://localhost:5000/people/`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:5000/people/${id}`).then(response => {
            console.log(response.status)
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    html: '<div style="display: flex; justify-content: center; align-items: center;">' +
                        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20; width: 70px; height: 70px;" xml:space="preserve"><circle style="fill:#25AE88;" cx="10" cy="10" r="10"/><polyline style="fill:none;stroke:#FFFFFF;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="15,7 9,13 5,10 "/></svg>' +
                        '</div>' +
                        '<p style="text-align: center;">Personal detail has been deleted!!</p>',
                    background: '#f8f9fa',
                    confirmButtonColor: '#4caf50',
                    iconColor: '#4caf50',
                    customClass: {
                        title: 'alert-title',
                        content: 'alert-content',
                        confirmButton: 'alert-confirm-button'
                    }
                })
                getData();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Unsuccessful',
                    text: "Person has not been deleted!!",
                    background: '#f8f9fa',
                    confirmButtonColor: '#f44336',
                    iconColor: '#f44336',
                    customClass: {
                        title: 'alert-title',
                        content: 'alert-content',
                        confirmButton: 'alert-confirm-button'
                    }
                })
            }
        })
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // setting data to the local variables
    const setData = (data) => {
        let {
            nic,
            fullName,
            otherName,
            gender,
            dob,
            address,
            phoneNum1,
            phoneNum2,
            job,
            specialNote,
            talents,
            aswasuma,
            wakugadu,
            abaditha,
            vadihiti,
            pilika,
            adyapana,
            shishyadhara,
            mahajanadara,
            wenath
        } = data;

        localStorage.setItem('NIC', nic);
        localStorage.setItem('FullName', fullName);
        localStorage.setItem('OtherName', otherName);
        localStorage.setItem('Gender', gender);
        localStorage.setItem('DOB', dob);
        localStorage.setItem('Address', address);
        localStorage.setItem('PhoneNum1', phoneNum1);
        localStorage.setItem('PhoneNum2', phoneNum2);
        localStorage.setItem('Job', job);
        localStorage.setItem('SpecialNote', specialNote);
        localStorage.setItem('Talents', talents);
        localStorage.setItem('Aswasuma', aswasuma);
        localStorage.setItem('Wakugadu', wakugadu);
        localStorage.setItem('Abaditha', abaditha);
        localStorage.setItem('Vadihiti', vadihiti);
        localStorage.setItem('Pilika', pilika);
        localStorage.setItem('Adyapana', adyapana);
        localStorage.setItem('Shishyadhara', shishyadhara);
        localStorage.setItem('Mahajanadara', mahajanadara);
        localStorage.setItem('Wenath', wenath);
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

    const exportPackages = () => {
        console.log("Export PDF")
        const unit = "mm";
        const size = "A3";
        const orientation = "landscape"; //landscape / portrait
        const marginLeft = 5;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Division Person List Report ";
        const headers = [
            [
                "ID",
                "Full Name",
                "Other Name",
                "Gender",
                "Bate Of Birth",
                "Age",
                "Address",
                "Phone Number 1",
                "Phone Number 2",
                "Job",
                "Special Note",
                "Talents",
                "Aswasuma",
                "Wakugadu",
                "Abaditha",
                "Vadihiti",
                "Pilika",
                "Adyapana",
                "Shishyadhara",
                "Mahajanadara",
                "Wenath"
            ]
        ];

        const pack = APIData.map(
            data => [
                data.nic,
                data.fullName,
                data.otherName,
                data.gender,
                data.dob.toString().split('T')[0],
                data.age,
                data.address,
                data.phoneNum1,
                data.phoneNum2,
                data.job,
                data.specialNote,
                data.talents,
                data.aswasuma,
                data.wakugadu,
                data.abaditha,
                data.vadihiti,
                data.pilika,
                data.adyapana,
                data.shishyadhara,
                data.mahajanadara,
                data.wenath
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
        doc.save("Full Personal Information List.pdf")
    }

    const Modal = ({ show, handleClose, data }) => {
        return (
            <>
                {show && (
                    <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className=" fixed overflow-scroll top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-80">
                        <div className="mt-28 relative p-4 max-w-2xl">
                            <div className="relative bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between p-2 border-b rounded-t">
                                    <h3 className="text-2xl  font-bold text-black ">
                                        Extra Detals
                                    </h3>

                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={handleClose}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Full Name
                                        </div>
                                        <div>
                                            {data.fullName}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Other Names
                                        </div>
                                        <div>
                                            {data.otherName}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Birth Date
                                        </div>
                                        <div>
                                            {data.dob.toString().split('T')[0]}
                                            {setBirthDate(data.dob.toString().split('T')[0])}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Age
                                        </div>
                                        <div className='p-2 bg-[#b3d8ff] text-center rounded-xl'>
                                            {data.age}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Job
                                        </div>
                                        <div>
                                            {data.job}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Address
                                        </div>
                                        <div>
                                            {data.address}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Special Notes
                                        </div>
                                        <div>
                                            {data.specialNote}

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Talents
                                        </div>
                                        <div>
                                            {data.talents}

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div class="">
                                            Gender
                                        </div>
                                        <div>
                                            {data.gender}

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 bg-[#9cd2ff] p-1 rounded-xl">
                                        <div class="">
                                            Phone Numbers
                                        </div>
                                        <div>
                                            {data.phoneNum1}

                                        </div>
                                        <div>
                                            {data.phoneNum2}

                                        </div>
                                    </div>
                                    <div class=" bg-gray-200 p-2 px-3 mt-2 rounded-xl">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                අස්වැසුම ආධාර
                                            </div>
                                            <div className={`${data.aswasuma === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.aswasuma === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p>Not Applied</p>
                                                }
                                            </div>


                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                වකුගඩු ආධාර
                                            </div>
                                            <div className={`${data.wakugadu === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.wakugadu === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                ආබාධිත ආධාර
                                            </div>
                                            <div className={`${data.abaditha === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.abaditha === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                වැඩිහිටි ආධාර
                                            </div>
                                            <div className={`${data.vadihiti === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.vadihiti === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                පිලිකා ආධාර
                                            </div>
                                            <div className={`${data.pilika === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.pilika === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                අධ්‍යාපන ආධාර
                                            </div>
                                            <div className={`${data.adyapana === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.adyapana === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                ශිෂ්‍ය ආධාර
                                            </div>
                                            <div className={`${data.shishyadhara === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.shishyadhara === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                මහජනාධාර ආධාර
                                            </div>
                                            <div className={`${data.mahajanadara === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.mahajanadara === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div class="">
                                                වෙනත් ආධාර
                                            </div>
                                            <div className={`${data.wenath === true ? 'bg-[#42ec3c] applied' : 'bg-[#ffd747] not-applied'} rounded-xl shadow-lg my-1`}>
                                                {data.wenath === true ?
                                                    <p className='text-center text-xl font-bold pt-2 '>ඇත</p> :
                                                    <p className='text-center text-xl font-bold pt-2 '>නැත</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 border-t">

                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-green-500 rounded-md hover:bg-blue-200' onClick={handleClose}>
                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                            <div class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <div className='self-center text-lg'>
                                                Close
                                            </div>
                                        </div>
                                    </button>
                                    <div class="">
                                        <Link to='/editBudget'>
                                            <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-blue-700 rounded-md hover:bg-blue-200' onClick={() => setData(data)}>
                                                <div class=" grid grid-cols-2 hover:text-black duration-100">
                                                    <div class="">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>

                                                    </div>
                                                    <div class="self-center text-lg">
                                                        Update
                                                    </div>
                                                </div>
                                            </button>
                                        </Link>
                                    </div>
                                    {/* <button onClick={handleClose} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">I accept</button> */}
                                    {/* <button onClick={handleClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">CLOSE</button> */}
                                    <div className="">
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-700 rounded-md hover:bg-blue-200' onClick={() => onDelete(data._id)} closeModal >
                                            <div class=" grid grid-cols-2 hover:text-black duration-100">
                                                <div class="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>


                                                </div>
                                                <div class="self-center text-lg">
                                                    Delete
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };



    return (
        <div>
            <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <h1 className=' text-center drop-shadow-md font-bold mt-6'>Personal Data Management</h1>
                                <table className=''>
                                    <tr>
                                        <td className='flex justify-center gap-2 pb-3'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/addBudget"}>
                                                        Add New
                                                    </Link></button>
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={exportPackages}>
                                                    Download Report
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                    <tr>
                                        <div class=" sm:flex-row sm:text-left sm:justify-end pb-3">
                                            <input
                                                className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                type="text"
                                                required
                                                icon='search'
                                                placeholder='Search here... '
                                                onChange={(e) => searchItems(e.target.value)}
                                            />
                                        </div>
                                    </tr>
                                </table>
                            </div>

                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='table-auto w-full text-lg text-left text-gray-500 dark:text-gray-400'>
                                    <thead className='p-5  text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr className='text-center'>
                                            <th className="p-2 border-black tbhead ">View</th>
                                            <th className="p-2 tbhead min-w-60 ">Full Name</th>
                                            <th className="p-2 tbhead">NIC</th>
                                            {/* <th className="p-2 tbhead">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* search list */}
                                        {searchInput.length > 1 ? (
                                            filteredResults.map((data) => {
                                                if (searchInput) {
                                                    return (
                                                        <tr className='bg-white font-bold text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                            <td className='px-3 py-2'>
                                                                <div class="flex justify-center">
                                                                    <div class="">
                                                                        <button className='max-h-12 min-w-14 border-2 self-center text-3xl rounded-3xl text-white duration-100 bg-green-500 hover:bg-red-200' onClick={toggleModal}>
                                                                            <div class="hover:text-black duration-100">
                                                                                <div class="justify-center ">
                                                                                    <p className=''>
                                                                                        👁️
                                                                                    </p>
                                                                                </div>
                                                                                {/* <div class="">
                                                                                View
                                                                            </div> */}
                                                                            </div>
                                                                        </button>
                                                                        <Modal show={showModal} handleClose={closeModal} data={data} />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='px-6 py-4 table-auto'>{data.fullName}</td>

                                                            <td className='px-6 py-4'>{data.nic}</td>
                                                            {/* <td className='px-6 py-4'>{data.dob.toString().split('T')[0]}</td> */}
                                                            {/* <td className='px-6 py-4'>{data.age}</td> */}

                                                            <div>

                                                            </div>

                                                        </tr>
                                                    )
                                                }
                                            })
                                        ) : (
                                            APIData.map((data) => {

                                                return (
                                                    <tr className='bg-white font-bold text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                        <td className='px-3 py-2'>
                                                            <div class="flex justify-center">
                                                                <div class="">
                                                                    <button className='max-h-12 min-w-14 border-2 self-center text-3xl rounded-3xl text-white duration-100 bg-green-500 hover:bg-red-200' onClick={toggleModal}>
                                                                        <div class="hover:text-black duration-100">
                                                                            <div class="justify-center ">
                                                                                <p className=''>
                                                                                    👁️
                                                                                </p>
                                                                            </div>
                                                                            {/* <div class="">
                                                                                View
                                                                            </div> */}
                                                                        </div>
                                                                    </button>
                                                                    <Modal show={showModal} handleClose={closeModal} data={data} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='px-6 py-4 table-auto'>{data.fullName}</td>

                                                        <td className='px-6 py-4'>{data.nic}</td>
                                                        {/* <td className='px-6 py-4'>{data.dob.toString().split('T')[0]}</td> */}
                                                        {/* <td className='px-6 py-4'>{data.age}</td> */}

                                                        <div>

                                                        </div>

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