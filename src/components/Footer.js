// Функциональный компонент, отвечающий за рендер футера

import React from 'react';
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; {new Date().getFullYear()} Mesto by Mikhail Kirichkov</p>
    </footer>
  );
}

export default Footer;