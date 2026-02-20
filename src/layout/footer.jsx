function Footer() {
  return (
    <footer className="page-footer" style={{ backgroundColor: '#292929', padding: 0 }}>
      <div className="footer-copyright" style={{ backgroundColor: 'transparent' }}>
        <div className="container" style={{ color: '#9e9e9e' }}>
          © {new Date().getFullYear()} Search4Movies, Валентина Б.
          <a 
            className="grey-text text-lighten-4 right" 
            href="https://github.com/valentiva" 
            target="_blank" 
            rel="noreferrer"
          >
            Мой репозиторий
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };