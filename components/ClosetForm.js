import { useState } from "react";
import Image from "next/image";
import { Button, Row, Col, Modal } from "antd";
import { BiCloset } from "react-icons/bi";
import { GiLabCoat } from "react-icons/gi";
import {
  PiTShirtLight,
  PiPantsLight,
  PiDressLight,
  PiEyeglassesThin,
} from "react-icons/pi";
import { TbShoe, TbBrandRedhat } from "react-icons/tb";
import { BsHandbag } from "react-icons/bs";
import { UploadOutlined } from "@ant-design/icons";
import Router from "next/router";

const categories = [
  { name: "ALL", icon: BiCloset },
  { name: "아우터", icon: GiLabCoat },
  { name: "상의", icon: PiTShirtLight },
  { name: "바지", icon: PiPantsLight },
  { name: "드레스", icon: PiDressLight },
  { name: "신발", icon: TbShoe },
  { name: "가방", icon: BsHandbag },
  { name: "모자", icon: TbBrandRedhat },
  { name: "액세서리", icon: PiEyeglassesThin },
];

export const initialClothes = {
  아우터: [
    { uid: "1", url: "/images/coat1.jpg" },
    { uid: "2", url: "/images/coat2.jpg" },
    { uid: "3", url: "/images/jacket1.jpg" },
    { uid: "4", url: "/images/jacket2.jpg" },
  ],
  상의: [
    { uid: "5", url: "/images/sweater1.jpg" },
    { uid: "6", url: "/images/sweater2.jpg" },
    { uid: "7", url: "/images/knit1.jpg" },
    { uid: "8", url: "/images/knit2.jpg" },
  ],
  바지: [
    { uid: "9", url: "/images/jeans1.jpg" },
    { uid: "10", url: "/images/jeans2.jpg" },
  ],
  드레스: [{ uid: "-7", url: "/images/dress1.jpg" }],
  신발: [{ uid: "-8", url: "/images/shoes1.jpg" }],
  가방: [{ uid: "-9", url: "/images/bag1.jpg" }],
  모자: [{ uid: "-10", url: "/images/hat1.jpg" }],
  액세서리: [],
};

const ClosetForm = ({ clothesData = initialClothes, showUploadButton = true, isOwner }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = (url) => {
    setPreviewImage(url);
    setPreviewOpen(true);
  };
  

  const handleScrollToCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    const target = document.getElementById(categoryName);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredCategories =
    selectedCategory === "ALL"
      ? Object.keys(clothesData)
      : [selectedCategory];

  const isClosetEmpty = filteredCategories.every(
    (category) => clothesData[category]?.length === 0
  );

  return (
    <div className="closet-container">
      <div className="category-bar">
        {categories.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            className={`category-button ${selectedCategory === name ? "active" : ""}`}
            onClick={() => handleScrollToCategory(name)}
          >
            <Icon size={24} />
            <span>{name}</span>
          </Button>
        ))}
      </div>

      {isOwner && showUploadButton && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            size="large"
            onClick={() => Router.push("/upload")}
            style={{ width: "200px" }}
          >
            상품 업로드하기
          </Button>
        </div>
      )}

      {isClosetEmpty ? (
        <div className="empty-message">현재 옷장에 등록된 옷이 없습니다.</div>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredCategories.map((category) => (
            <Col key={category} xs={24} sm={12}>
              <div className="category-section" id={category}>
                <div className="category-title">{category.toUpperCase()}</div>
                <div className="grid-wrapper">
                  <Row gutter={[8, 8]}>
                    {clothesData[category]?.slice(0, 4).map((item) => (
                      <Col key={item.uid} span={12}>
                      <div className="image-box" onClick={() => handlePreview(item.url)}>
                        <Image
                          src={item.url}
                          alt={category}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      </Col>
                    ))}
                    {Array.from({
                      length: 4 - (clothesData[category]?.slice(0, 4).length || 0),
                    }).map((_, idx) => (
                      <Col key={`empty-${idx}`} span={12}>
                        <div className="empty-box" />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)} centered>
       <Image src={previewImage} alt="Preview" width={400} height={400} style={{ objectFit: "cover" }} />
      </Modal>

      <style jsx>{`
        .grid-wrapper {
          max-width: 260px;
          margin: 0 auto;
        }
        .closet-container {
          padding: 20px;
          max-width: 1000px;
          margin: auto;
          background-size: cover;
          border-radius: 15px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
        }
        .category-bar {
          display: flex;
          overflow-x: auto;
          padding: 15px 0;
          border-bottom: 2px solid #8b5a2b;
          justify-content: center;
        }
        .category-bar > :not(:last-child) {
          margin-right: 15px;
        }
        .category-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: #fff8f0;
          color: #6b4226;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-size: 12px;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
        }
        .category-button:hover {
          background: #f5e1c5;
        }
        .category-button.active {
          background: #8b5a2b;
          color: white;
        }
        .category-section {
          margin-top: 40px;
        }
        .category-title {
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border: 2px solid #8b5a2b;
          border-radius: 10px;
          overflow: hidden;
          background: white;
          cursor: pointer;
        }
        .image-box :global(img) {
          object-fit: cover;
        }
        .empty-box {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f2f2f2;
          border: 2px dashed #ccc;
          border-radius: 10px;
        }
        .empty-message,
        .empty-category-message {
          text-align: center;
          color: #555;
          padding: 20px;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ClosetForm;
