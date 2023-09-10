/* eslint-disable react/no-array-index-key */
import { Grid } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function Camera() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      return setDevices(
        mediaDevices.filter(({ kind }) => kind === "videoinput"),
      );
    },
    [setDevices],
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <Grid h="100vh" pos="absolute" top={0} right={0} left={0} w="100%">
      {devices.map((device, key) => {
        return (
          <>
            <Webcam
              key={key}
              audio={false}
              videoConstraints={{ deviceId: device.deviceId }}
              height="100%"
            />
            {device.label || `Device ${key + 1}`}
          </>
        );
      })}
    </Grid>
  );
}
