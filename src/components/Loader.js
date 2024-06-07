const Loader = () => {
    return (
        <div className="min-h-screen w-full flex grow items-center justify-center space-x-2 bg-neutral-700">
            <div className="w-10 h-10 border-t-4 border-gray-200 rounded-full spin spinner"></div>
            <p className="text-gray-100">Загрузка...</p>
        </div>
    )
}

export default Loader;