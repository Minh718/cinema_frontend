import React, { useState } from "react";

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  bookingData,
  onConfirm,
}) {
  const [paymentMethod, setPaymentMethod] = useState("MOMO");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(paymentMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 opacity-100">
        <h2 className="text-xl font-semibold text-center mb-4">
          Confirm order
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <strong>Cinema:</strong> {bookingData.cinemaName}
          </div>
          <div>
            <strong>Movie:</strong> {bookingData.movieTitle}
          </div>
          <div>
            <strong>Show time:</strong> {bookingData.showTime}
          </div>
          <div>
            <strong>Seat:</strong>{" "}
            <span className="font-semibold">{bookingData.seats}</span>
          </div>

          <div>
            <strong>Personal information:</strong>
            <div>{bookingData.customerName}</div>
            <div>{bookingData.phone}</div>
            <div>{bookingData.email}</div>
          </div>

          <div>
            <strong>Method payment:</strong>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="MOMO">MOMO</option>
              <option value="VNPAY">VNPAY</option>
            </select>
          </div>

          <div>
            <strong>Total price:</strong>{" "}
            {bookingData.totalPrice.toLocaleString()} đ
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-rose-500 text-white hover:bg-rose-600"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
