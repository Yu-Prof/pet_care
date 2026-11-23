import Image from 'next/image';
import { BookingButton, BookingProvider } from './components/booking';
import StoreGallery from './components/store-gallery';
import { services } from './services';

const serviceIcons = {
  bath: (
    <>
      <path d="M3 13h18M4 13l1.2 4a3 3 0 0 0 2.9 2h7.8a3 3 0 0 0 2.9-2l1.2-4M7 19v2m10-2v2M5 13V6a2 2 0 0 1 4 0v1" />
      <circle cx="16" cy="8" r="2" />
      <path d="M12 4h.01m7-1h.01" />
    </>
  ),
  care: (
    <path strokeLinejoin="round" d="M10 3C8 7 4 10 4 14a6 6 0 0 0 12 0c0-4-4-7-6-11ZM7 15a3 3 0 0 0 2 2m9-13v6m-3-3h6m-1 8v4m-2-2h4" />
  ),
  trim: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="m8 8 13 13M8 16 21 3m-7 11 2 2" />
    </>
  ),
};

function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="currentColor">
              <ellipse cx="6.7" cy="13" rx="3.3" ry="4.2" transform="rotate(-27 6.7 13)" />
              <ellipse cx="12.5" cy="8.5" rx="3.2" ry="4.3" transform="rotate(-12 12.5 8.5)" />
              <ellipse cx="20" cy="8.5" rx="3.2" ry="4.3" transform="rotate(12 20 8.5)" />
              <ellipse cx="25.8" cy="13" rx="3.3" ry="4.2" transform="rotate(27 25.8 13)" />
              <path d="M16 14c-3.2 0-4.3 3-7.2 5.1-4 3.1-1.6 8.6 2.2 8 2.3-.4 3.2-1.2 5-1.2s2.7.8 5 1.2c3.8.6 6.2-4.9 2.2-8C20.3 17 19.2 14 16 14Z" />
            </svg>
          </span>
          泡泡毛球
        </a>
        <nav aria-label="主导航">
          <a href="#home">首页</a>
          <a href="#services">洗护服务</a>
          <a href="#store">店内环境</a>
          <a href="#faq">常见问题</a>
        </nav>
        <BookingButton className="btn btn-dark btn-small">预约洗护</BookingButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero wrap" id="home">
      <div>
        <p className="eyebrow">猫狗洗护与美容</p>
        <h1>洗个澡，<br /><span className="swash">变回小毛球。</span></h1>
        <p className="intro">从温水洗澡到吹干梳毛，顺着毛孩子的节奏慢慢来。洗完干干净净，抱起来软乎乎。</p>
        <div className="actions">
          <BookingButton className="btn">预约洗护</BookingButton>
          <a className="textlink" href="#services">看看服务</a>
        </div>
        <div className="promises">
          <span>猫狗均可预约</span>
          <span>按体型报价</span>
          <span>初次到店可备注</span>
        </div>
      </div>
      <figure className="hero-photo">
        <Image
          src="/images/poodle.jpg"
          width={960}
          height={1200}
          alt="戴着黄色格纹领巾的杏色贵宾犬"
          preload
        />
        <span className="spark" aria-hidden="true">✦</span>
        <figcaption className="photo-note">洗香香 · 梳蓬松</figcaption>
      </figure>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-top">
          <div>
            <p className="eyebrow">服务与价格</p>
            <h2>今天洗哪一种？</h2>
          </div>
          <p>从日常清洁到换个新造型。</p>
        </div>
        <div className="cards">
          {services.map(({ id, name, description, price }) => (
            <article className="card" key={id}>
              <span className="tile" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  {serviceIcons[id]}
                </svg>
              </span>
              <h3>{name}</h3>
              <p>{description}</p>
              <div className="card-bottom">
                <span className="price">¥{price}<small>起</small></span>
                <BookingButton service={name} aria-label={`预约${name}`}>预约此项</BookingButton>
              </div>
            </article>
          ))}
        </div>
        <p className="note">以上为示例起价，实际费用按宠物体型、毛量和毛发状况确认。</p>
      </div>
    </section>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <section className="faq wrap" id="faq">
      <div>
        <p className="eyebrow">到店前</p>
        <h2>常见问题</h2>
      </div>
      <div>
        <details>
          <summary>一次洗护大约需要多久？</summary>
          <p>基础洗护通常可预留 1 至 2 小时。造型修剪、厚毛或打结较多时，时间会相应延长。</p>
        </details>
        <details>
          <summary>猫咪也可以预约吗？</summary>
          <p>可以。预约时请选择猫咪，并备注它是否怕水、怕吹风或容易紧张。</p>
        </details>
        <details>
          <summary>第一次来需要带什么？</summary>
          <p>请用牵引绳或航空箱带宠物到店。有过敏、皮肤问题或近期不适，请提前告知。</p>
        </details>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <StoreGallery />
        <FrequentlyAskedQuestions />
        <section className="booking wrap">
          <div>
            <h2>给毛孩子约个洗澡时间</h2>
            <p>选好服务和到店日期、时间，生成一份预约信息。</p>
          </div>
          <BookingButton className="btn btn-dark">填写预约</BookingButton>
        </section>
      </main>
      <footer>
        <div className="wrap">
          <span>泡泡毛球 · 宠物洗护</span>
          <span>门店网页示例</span>
        </div>
      </footer>
    </BookingProvider>
  );
}
