import InfoImage from "./assets/pixel-cat.png";

export default function Info() {
  return (
    <>
      <div className="top-section">
        <img src={InfoImage} alt="Pixeled Cat" />
      </div>
      <div className="bottom-section">
        <h1 className="name">Helia Kiani</h1>
        <h2 className="major">CE Student</h2>
        <h3>
          <small>at</small>
          <br /> Marmara University
        </h3>
        <button className="mail-btn">
          <i className="fa-solid fa-envelope"></i> Email
        </button>
      </div>
    </>
  );
}
