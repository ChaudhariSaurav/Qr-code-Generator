import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Input, Button, Spin } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  MinusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayQr, setDisplayQr] = useState(false);
  const [qrSize, setQrSize] = useState(256); // Initial size of QR code

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

  const increaseQrSize = () => {
    setQrSize(qrSize + 50); // Increase size by 50 pixels
  };

  const decreaseQrSize = () => {
    if (qrSize > 50) {
      setQrSize(qrSize - 50); // Decrease size by 50 pixels, minimum size 50 pixels
    }
  };

  const handlePrint = () => {
    const qrCodeElement = document.getElementById("qr-code");
    if (qrCodeElement) {
      const qrCodeUrl = qrCodeElement.toDataURL("image/png");
      const windowContent = `<img src="${qrCodeUrl}" />`;
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
          </head>
          <body onload="window.print();">${windowContent}</body>
        </html>
      `);
      printWindow.document.close();
    }
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
        <div className="flex items-center justify-center mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={increaseQrSize}
            className="mr-2"
          >
            Increase Size
          </Button>
          <Button
            type="primary"
            icon={<MinusOutlined />}
            onClick={decreaseQrSize}
            className="mr-2"
          >
            Decrease Size
          </Button>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
          >
            Print QR Code
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        ) : (
          displayQr && (
            <div className="flex items-center justify-center">
              <QRCode id="qr-code" value={text} size={qrSize} />
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
