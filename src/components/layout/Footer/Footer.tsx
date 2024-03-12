import { MapPin } from 'lucide-react';
export function Footer() {
  return (
    <footer className="py-6 mt-12 border-t md:px-8 md:py-0">
      <div className="container my-10">
        <div className="flex font-medium">
          <MapPin /> <div className="pl-5">Trụ sở Hòa Lạc</div>
        </div>
        <div className="flex text-sm">
          <div>Địa chỉ:</div> <div className="pl-5 text-secondary-foreground">Tân Xã, Thạch Thất, Hà Nội</div>
        </div>
        <div className="flex text-sm">
          <div>Fanpage:</div>{' '}
          <div className="pl-5 text-secondary-foreground">
            <a
              href="https://www.facebook.com/profile.php?id=100083483767529"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Hòa Lạc House{' '}
            </a>
          </div>
        </div>
        <div className="flex text-sm">
          <div>Facebook Group:</div>{' '}
          <div className="pl-5 text-secondary-foreground">
            <a
              href="https://www.facebook.com/groups/1156910228639296"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Hòa Lạc House{' '}
            </a>
          </div>
        </div>
        <div className="flex text-sm">
          <div>Số điện thoại:</div> <div className="pl-5 text-secondary-foreground">0961718609</div>
        </div>
      </div>
      {/* <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
                    Built by <a href="https://www.facebook.com/nameishai" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">nameishai</a>
                    . The source code is available on <a href="https://github.com/name-is-hai/Exe" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                        GitHub
                    </a>.
                </p>
            </div> */}
    </footer>
  );
}
