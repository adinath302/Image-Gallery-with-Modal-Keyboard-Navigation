import React, { useCallback, useEffect, useState } from 'react'

import image_1 from '../../assets/card1.jpg';
import image_2 from '../../assets/card2.jpg';
import image_3 from '../../assets/card3.jpg';
import image_4 from '../../assets/card4.jpg';
import image_5 from '../../assets/profile.jpg';
import image_6 from '../../assets/image6.jpg';
import image_7 from '../../assets/image7.jpg';
import image_8 from '../../assets/image8.jpg';

const imageData = [
    { id: 1, title: 'image_1', src: image_1, liked: false },
    { id: 2, title: 'image_2', src: image_2, liked: false },
    { id: 3, title: 'image_3', src: image_3, liked: false },
    { id: 4, title: 'image_4', src: image_4, liked: false },
    { id: 5, title: 'image_5', src: image_5, liked: false },
    { id: 6, title: 'image_6', src: image_6, liked: false },
    { id: 7, title: 'image_7', src: image_7, liked: false },
    { id: 8, title: 'image_8', src: image_8, liked: false },
]

const Image_gallery = () => {

    const [imgData, setImgData] = useState(imageData)
    const [openImageId, setOpenImageId] = useState(null)
    const [ToggleTab, setToggletab] = useState(false);
    const [theme, setTheme] = useState(false);

    const openImage = imgData.find((item) => item.id === openImageId) || null;
    // console.log('OpenImage LOG', openImage);
    const currentIndex = imgData.findIndex((item) => item.id === openImageId);
    console.log('CurrentIndex LOG', currentIndex);

    const HandleModel = (id) => {
        setOpenImageId(id)
    }

    const closeModal = () => {
        setOpenImageId(null)
    }
    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            const pervImageId = imgData[currentIndex - 1].id;
            setOpenImageId(pervImageId);
        }
    }, [currentIndex, imgData]);

    const handleNext = useCallback(() => {
        if (currentIndex < imgData.length - 1) {
            const nextImage = imgData[currentIndex + 1].id
            setOpenImageId(nextImage);
        }
    }, [currentIndex, imgData]);

    useEffect(() => {
        const HandleKeyDown = (event) => {
            if (openImageId === null) return;
            if (event.key === 'Escape') {
                closeModal
            } else if (event.key === 'ArrowRight') {
                handleNext()
            } else if (event.key === 'ArrowLeft') {
                handlePrev()
            }
        }
        window.addEventListener('keydown', HandleKeyDown);
        return () => {
            window.removeEventListener('keydown', HandleKeyDown)
        }
    }, [openImageId, handleNext, handlePrev])

    const HandleLike = (id) => {
        setImgData(prevImgData =>
            prevImgData.map((item) => item.id === id ? { ...item, liked: !item.liked } : item)
        )
    }

    const unlikedFilter = imgData.filter((item) => item.liked === false);
    const likedfilter = imgData.filter((item) => item.liked === true);

    const currentList = ToggleTab === false ? unlikedFilter : likedfilter; // if ToggleTab is false then show unliked images else show liked images , then these two will stored inside currentList 

    return (
        <div className={`relative flex p-4 flex-col min-h-screen ${theme ? 'bg-gray-900 text-white' : ''}`}>
            <div className='flex items-center justify-center mb-6'>
                <div className='text-xl font-semibold'>Image Gallery</div>
            </div>
            <div onClick={() => setTheme(!theme)} className='absolute top-4 right-4 cursor-pointer text-2xl select-none '>
                {theme ? '🌙' : '🌞'}
            </div>
            <div className='flex justify-center items-center'>
                <div
                    onClick={() => setToggletab(false)}
                    className={`font-semibold border-t-0 border-l-0 rounded-tl-lg border-r-0 p-1 cursor-pointer ${ToggleTab === false ? 'bg-gray-200 ' : "text-black"} ${theme ? 'bg-gray-500 text-white' : ''}`}>
                    Unliked ({unlikedFilter.length})
                </div>
                <div
                    onClick={() => setToggletab(true)}
                    className={`font-semibold border-t-0 border-r-0 rounded-tr-lg p-1 cursor-pointer ${ToggleTab === true ? 'bg-gray-200' : "text-black"} ${theme ? 'bg-gray-500 text-white' : ''} `}>
                    Liked ({likedfilter.length})
                </div>
            </div>

            <div
                key={ToggleTab ? 'liked' : 'unliked'}
                className={`${theme ? 'bg-gray-500 shadow-gray-500 border-gray-500' : ''} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 bg-gray-200 p-6 rounded-lg border shadow-gray-200 shadow-md transition-all duration-200`}>
                {
                    currentList.length > 0 ? ( // if currentList has items then show the images
                        currentList.map((item) => {
                            return (
                                <div key={item.id} className='hover:scale-120 relative flex items-center justify-center transition-all duration-200'>
                                    <img
                                        className='w-40 h-40 rounded-md'
                                        src={item.src}
                                        alt="Image"
                                        onClick={() => HandleModel(item.id)}
                                    />
                                    <div
                                        onClick={() => HandleLike(item.id)}
                                        className='absolute top-1 right-15 select-none cursor-pointer text-xl'
                                    >{item.liked ? "❤️" : "🤍"}</div>
                                </div>
                            )
                        })

                    ) : (
                        <div className='col-span-full text-center p-4 text-gray-700 font-medium'>
                            {ToggleTab ? 'You havent liked any images yet 😔' : "All images are currently liked! 👍"}
                        </div>
                    )}
                {
                    openImage !== null && ( // if openImage is not null then show the modal
                        <div onClick={closeModal} className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md'>
                            <div className='relative'>
                                <button
                                    onClick={closeModal}
                                    className='absolute top-2 right-2 bg-white/70 p-2 rounded-full text-xl font-bold hover-bg-white '
                                >
                                    &times;
                                </button>

                                <div
                                    onClick={() => HandleLike(openImage.id)}
                                    className='absolute top-4 left-4 cursor-pointer text-3xl p-1 z-20 transition-transform hover:scale-110'
                                >
                                    {openImage.liked ? "❤️" : "🤍"}
                                </div>

                                <div className='absolute inset-0 flex items-center justify-between pointer-events-none'>
                                    <button
                                        onClick={handlePrev}
                                        disabled={openImageId === 0}
                                        className='h-12 w-12 rounded-full absolute top-1/2 -translate-y-1/2 left-4 z-10 text-2xl bg-white/50 hover:bg-white/80 transition-all pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed'>&lt;</button>
                                    <button
                                        onClick={handleNext}
                                        disabled={openImageId === imgData.length - 1}
                                        className='h-12 w-12 rounded-full absolute top-1/2 -translate-y-1/2 right-4 z-10 text-2xl bg-white/50 hover:bg-white/80 transition-all pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed'>&gt;</button>
                                </div>
                                <img
                                    className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-md shadow-white object-contain'
                                    src={openImage.src}
                                    alt={openImage.title}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Image_gallery