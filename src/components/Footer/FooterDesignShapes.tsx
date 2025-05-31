
export const FooterDesignShapes = ({ direction = 'left' }: { direction: 'left' | 'right' }) => (
    <div className="flex items-center ">
        {direction === 'left' && (
            <>
                <div className="h-1 w-[43rem] bg-[#004AAD]" />
                <div className="w-1 h-1 -ml-2 border-y-[15px] border-y-transparent border-l-[30px] border-l-[#004AAD] rotate-180" />
            </>
        )}
        {direction === 'right' && (
            <>
                <div className="w-0 h-0 -mr-2 border-y-[15px] border-y-transparent border-r-[30px] border-r-[#004AAD] rotate-180" />
                <div className="h-1 w-[43rem] bg-[#004AAD]" />
            </>
        )}
    </div>
); 