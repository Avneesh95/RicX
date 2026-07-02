const PDFDocument = require("pdfkit");
const Order = require("../model/OrderModel");

const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=RicX-Invoice-${order._id}.pdf`
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    doc.pipe(res);

    // ==================================
    // BRAND HEADER
    // ==================================

    doc
      .fontSize(28)
      .fillColor("#4F46E5")
      .text("RicX Store", {
        align: "center",
      });

    doc
      .fontSize(12)
      .fillColor("black")
      .text("Premium Online Shopping", {
        align: "center",
      });

    doc.moveDown();

    doc
      .strokeColor("#4F46E5")
      .lineWidth(2)
      .moveTo(50, 110)
      .lineTo(550, 110)
      .stroke();

    doc.moveDown(2);

    // ==================================
    // INVOICE INFO
    // ==================================

    doc
      .fontSize(20)
      .fillColor("#111827")
      .text("INVOICE");

    doc.moveDown();

    doc.fontSize(11);

    doc.text(`Invoice ID : ${order._id}`);
    doc.text(
      `Order Date : ${new Date(
        order.createdAt
      ).toLocaleString()}`
    );
    doc.text(
      `Payment Method : ${order.paymentMethod}`
    );
    doc.text(
      `Payment Status : ${order.paymentStatus.toUpperCase()}`
    );
    doc.text(
      `Order Status : ${order.status.toUpperCase()}`
    );

    doc.moveDown();

    // ==================================
    // CUSTOMER DETAILS
    // ==================================

    doc
      .fontSize(15)
      .fillColor("#4F46E5")
      .text("Customer Details");

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("black");

    doc.text(`Name : ${order.user.name}`);
    doc.text(`Email : ${order.user.email}`);
    doc.text(
      `Phone : ${order.shippingAddress.phone}`
    );

    doc.moveDown();

    // ==================================
    // SHIPPING ADDRESS
    // ==================================

    doc
      .fontSize(15)
      .fillColor("#4F46E5")
      .text("Shipping Address");

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("black");

    doc.text(
      `${order.shippingAddress.fullName}`
    );

    doc.text(
      `${order.shippingAddress.address}`
    );

    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state}`
    );

    doc.text(
      `${order.shippingAddress.country} - ${order.shippingAddress.pincode}`
    );

    doc.moveDown(2);

    // ==================================
    // PRODUCTS TABLE
    // ==================================

    doc
      .fontSize(15)
      .fillColor("#4F46E5")
      .text("Ordered Products");

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("black");

    doc.text(
      "------------------------------------------------------------"
    );

    doc.text(
      "Product                    Qty        Price        Total"
    );

    doc.text(
      "------------------------------------------------------------"
    );

    order.orderItems.forEach((item) => {
      const total =
        item.quantity * item.price;

      doc.text(
        `${item.product.name.substring(
          0,
          22
        ).padEnd(26)} ${String(
          item.quantity
        ).padEnd(8)} ₹${String(
          item.price
        ).padEnd(10)} ₹${total}`
      );
    });

    doc.text(
      "------------------------------------------------------------"
    );

    doc.moveDown(2);

    // ==================================
    // TOTAL
    // ==================================

    doc
      .fontSize(18)
      .fillColor("#059669")
      .text(
        `Grand Total : ₹${order.totalAmount}`,
        {
          align: "right",
        }
      );

    doc.moveDown(3);

    // ==================================
    // THANK YOU
    // ==================================

    doc
      .fontSize(16)
      .fillColor("#4F46E5")
      .text(
        "Thank you for shopping with RicX Store!",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(10)
      .fillColor("gray")
      .text(
        "This is a computer-generated invoice and does not require a signature.",
        {
          align: "center",
        }
      );

    doc.text(
      "For support contact: support@ricxstore.com",
      {
        align: "center",
      }
    );

    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInvoice,
};