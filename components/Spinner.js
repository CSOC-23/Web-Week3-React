import Image from 'next/image';

const Spinner = () => {
        return (
            <div className='text-center ml-32' >
                <Image src={"/spinner.gif"} alt="loading" width={40} height={40}/>
            </div>
        )
}

export default Spinner