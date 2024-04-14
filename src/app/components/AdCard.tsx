const AdCard = ({ data }: { data: any }) => {
    return (
        <div
            style={{ backgroundImage: `linear-gradient(to right , rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0) ),url(${data.image})` }}
            className="p-2 bg-gray-200 bg-cover bg-center rounded cursor-pointer h-[40vh] ">

            {/* Card header */}
            <div className="flex justify-between items-center">
                <div className="h-[25px] w-[25px] flex items-center justify-center text-white rounded-full bg-green-600">
                    %
                </div>
                <div className="rounded-3xl bg-opacity-20 text-white bg-black w-fit py-2 px-3 text-xs">
                    {data.duration}
                </div>
            </div>

            {/* Card Content */}
            <div className="text-white capitalize grid py-2 gap-2 md:gap-1">
                <h1 className="w-[14rem] md:w-[35%] text-md md:text-xl font-bold">
                    {data.title}
                </h1>
                <div className="text-5xl md:text-6xl font-bold">
                    {data.discount}%
                </div>
                <div className="mt-0 md:mt-3 text-sm">
                    *with terms and conditions
                </div>
            </div>
        </div>
    );
}

export default AdCard;