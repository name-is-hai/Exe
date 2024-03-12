import MenuLink from './MenuLink';

interface NavMenuProps {
  className?: string;
}

export const NavMenu = ({ className }: NavMenuProps) => {
  return (
    <nav className={className}>
      <MenuLink
        name="Trang Chủ"
        href="/"
      />
      <MenuLink
        name="Phòng"
        href="/room"
      />
      {/* <MenuLink name="Property" href="/property" /> */}
      <MenuLink
        name="Liên hệ"
        href="/contact"
      />
    </nav>
  );
};
