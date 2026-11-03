export default function About() {
  return (
    <section id="about" className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <img
        className="profile-image"
        src="/assets/profile.jpg"
        alt="Profile picture of Chen Xi"
        width="320"
        height="320"
      />
      <div className="about-text">
        <h2>About me</h2>
        <p>I am Chen Xi. I enjoy making useful web pages.</p>
        <h3>Skills I am practising</h3>
        <ul>
          <li>HTML page structure</li>
          <li>CSS page design</li>
          <li>JavaScript interaction</li>
        </ul>
      </div>
    </section>
  );
}
