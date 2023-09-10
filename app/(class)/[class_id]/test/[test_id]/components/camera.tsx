/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Image } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { TbScan } from "react-icons/tb";

export default function ScanButton() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <Button
        w="fit-content"
        onClick={openCamera}
        leftIcon={<TbScan style={{ fontSize: "1.5rem" }} />}
      >
        SCAN
      </Button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }} // Hide the input element
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      {/* {image ? <Image src={image} alt="Preview" /> : null} */}
    </>
  );
}
