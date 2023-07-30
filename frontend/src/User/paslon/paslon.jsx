import sampleImage from '../../assets/IMG-20220723-WA0013.jpg'

export default function Paslon({ popUpS }) {

    const axios = require('axios').default;
    axios.get('http://localhost/phpmyadmin/')

    return (
        < >
            {/* <div className='bg-gray-400 w-full h-16 text-white'>
            </div> */}
            <div className="grid grid-cols-2 gap-10 justify-items-center content-center w-full h-auto px-28 pb-10 pt-10">
                <div className="rounded-t-[40%] rounded-b-xl bg-gray-400 w-72 h-80 pb-4 grid justify-center align-middle gap-3">
                    <img className="rounded-t-[50%] rounded-b-xl w-64 h-52 mt-3 flex justify-center object-cover" src={sampleImage} sizes='cover'></img>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white">Visi Dan Misi</button>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white rounded-b-xl">Program Kerja</button>
                </div>
                <div className="rounded-t-[40%] rounded-b-xl bg-gray-400 w-72 h-80 pb-4 grid justify-center align-middle gap-3">
                    <div className="rounded-t-[50%] rounded-b-xl bg-black w-64 h-52 mt-3"></div>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white">Visi Dan Misi</button>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white rounded-b-xl">Program Kerja</button>
                </div>
                <div className="rounded-t-[40%] rounded-b-xl bg-gray-400 w-72 h-80 pb-4 grid justify-center align-middle gap-3">
                    <div className="rounded-t-[50%] rounded-b-xl bg-black w-64 h-52 mt-3"></div>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white">Visi Dan Misi</button>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white rounded-b-xl">Program Kerja</button>
                </div>
                <div className="rounded-t-[40%] rounded-b-xl bg-gray-400 w-72 h-80 pb-4 grid justify-center align-middle gap-3">
                    <div className="rounded-t-[50%] rounded-b-xl bg-black w-64 h-52 mt-3"></div>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white">Visi Dan Misi</button>
                    <button onClick={ () => popUpS(true) } className="bg-red-500 text-white rounded-b-xl">Program Kerja</button>
                </div>
            </div>
        </>
    )
}