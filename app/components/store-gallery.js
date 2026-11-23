'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const slides = [
  {
    name: '接待等候区',
    image: '/images/reception.jpg',
    alt: '浅橡木接待台、窗边等候长椅和通向洗护区的玻璃门',
  },
  {
    name: '宠物沐浴区',
    image: '/images/bathing.jpg',
    alt: '鼠尾草绿瓷砖墙前的不锈钢宠物浴槽、冲洗喷头和防滑坡道',
  },
  {
    name: '吹干修剪区',
    image: '/images/grooming.jpg',
    alt: '玻璃隔间里的升降美容台、宠物吹水机和修剪工具',
  },
];

export default function StoreGallery() {
  const [current, setCurrent] = useState(0);
  const [rotation, setRotation] = useState(null);

  useEffect(() => {
    setRotation(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!rotation) return;
    const timer = window.setInterval(() => {
      setCurrent(index => (index + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [rotation]);

  function chooseSlide(index) {
    setRotation(false);
    setCurrent(index);
  }

  return (
    <section className="store-gallery" id="store" aria-labelledby="store-title">
      <div className="wrap">
        <div className="section-top"><h2 id="store-title">店内环境</h2></div>
        <figure>
          <div className="store-slides">
            {slides.map(({ image, alt }, index) => (
              <div key={image} id={`store-slide-${index}`} hidden={current !== index}>
                <Image src={image} width={1600} height={900} alt={alt} />
              </div>
            ))}
          </div>
          <div className="store-controls" role="group" aria-label="店内环境轮播" hidden={rotation === null}>
            {slides.map(({ name }, index) => (
              <button
                key={name}
                type="button"
                aria-controls={`store-slide-${index}`}
                aria-pressed={current === index}
                onClick={() => chooseSlide(index)}
              >
                {name}
              </button>
            ))}
            <button className="store-rotation" type="button" onClick={() => setRotation(enabled => !enabled)}>
              {rotation ? '暂停轮播' : '自动轮播'}
            </button>
          </div>
          <figcaption>AI 生成的门店环境示意图</figcaption>
        </figure>
      </div>
    </section>
  );
}
