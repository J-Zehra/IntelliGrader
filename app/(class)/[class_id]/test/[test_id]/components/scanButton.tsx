/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";
import { TbScan } from "react-icons/tb";
import { useSetRecoilState } from "recoil";
import { fileState } from "@/state/fileState";

export default function ScanButton() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setImage = useSetRecoilState(fileState);

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage({
        image: event.target.files[0],
        imageUrl: URL.createObjectURL(event.target.files[0]),
      });
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
