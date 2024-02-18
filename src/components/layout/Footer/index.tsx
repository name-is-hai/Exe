import { MapPin } from 'lucide-react';
export function Footer() {
    return (
        <footer className="py-6 mt-12 border-t md:px-8 md:py-0">
            <div className='container mt-10'>
                <div className='flex font-medium'><MapPin /> <div className='pl-5'>Trụ sở Hòa Lạc</div></div>
                <div className='flex text-sm'><div>Địa chỉ:</div> <div className='pl-5 text-secondary-foreground'>Ngõ 12, Nhà số 1, đường Mục Uyên Công Nghệ, Tân Xã</div></div>
                <div className='flex text-sm'><div>Email:</div> <div className='pl-5 text-secondary-foreground'>haivdnhe160490@fot.edu.vn</div></div>
                <div className='flex text-sm'><div>Số điện thoại</div> <div className='pl-5 text-secondary-foreground'>0961718609</div></div>
            </div>

            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
                    Built by <a href="https://www.facebook.com/nameishai" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">nameishai</a>
                    . The source code is available on <a href="https://github.com/name-is-hai/Exe" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                        GitHub
                    </a>.
                </p>
            </div>
        </footer>
    )
}