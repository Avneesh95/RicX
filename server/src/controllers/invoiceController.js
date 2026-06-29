const PDFDocument = require("pdfkit");
const Order = require("../model/OrderModel");

const generateInvoice = async (req, res) => {
  try {
    console.log("Invoice Order ID:", req.params.id);

    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("orderItems.product");

    console.log("Found Order:", order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // ===== HEADER =====

    doc.fontSize(22).text("INVOICE", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Customer: ${order.user.name}`);
    doc.text(`Email: ${order.user.email}`);
    doc.text(`Date: ${order.createdAt}`);

    doc.moveDown();
    doc.text("--------------------------------------");

    // ===== ITEMS =====

    order.orderItems.forEach((item) => {
      doc.text(
        `${item.product.name} | Qty: ${item.quantity} | ₹${item.price}`
      );
    });

    doc.moveDown();
    doc.text("--------------------------------------");

    // ===== TOTAL =====

    doc.fontSize(14).text(
      `Total Amount: ₹${order.totalAmount}`,
      {
        align: "right",
      }
    );

    doc.end();
  } catch (error) {
    console.log("Invoice Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInvoice,
};