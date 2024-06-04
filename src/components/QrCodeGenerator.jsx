import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayQr, setDisplayQr] = useState(false);

  useEffect(() => {
    if (text) {
      setLoading(true);
      setDisplayQr(false);
      const timeout = setTimeout(() => {
        setLoading(false);
        setDisplayQr(true);
      }, 500); // Simulate loading time
      return () => clearTimeout(timeout);
    } else {
      setDisplayQr(false);
    }
  }, [text]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-6 bg-gray-100 rounded-lg shadow-xl max-w-7xl">
        <TextArea
          className="mb-4 p-2 w-full max-w-2xl border border-gray-300 rounded"
          placeholder="Enter text to generate QR code"
          value={text}
          onChange={handleInputChange}
          rows={8}
        />
        {loading ? (
          <div className="flex items-center justify-center">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        ) : (
          displayQr && (
            <div className="flex items-center justify-center">
              <QRCode value={text} size={256} />
            </div>
          )
        )}
        <div className="mt-4">
          <Button type="primary" onClick={() => setText("")}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
