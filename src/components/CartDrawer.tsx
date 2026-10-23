import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Check, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePreferences } from '../context/PreferencesContext';
import { useOrders } from '../context/OrdersContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotalUSD,
    discountUSD,
    shippingUSD,
    totalUSD,
    promoCode,
    applyPromoCode,
    removePromoCode,
    promoError,
    freeShippingThreshold,
    amountUntilFreeShipping
  } = useCart();

  const { formatPrice } = usePreferences();
  const { addOrder } = useOrders();
  const [promoInput, setPromoInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [orderId, setOrderId] = useState('');

  // Checkout form fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCity] = useState('Cairo');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const placedOrder = addOrder({
        customerName: formName.trim() || 'Cairo Client',
        customerEmail: formEmail.trim() || 'order@cairo.eg',
        customerPhone: formPhone.trim() || '0100 000 0000',
        deliveryAddress: formAddress.trim() || 'Cairo Delivery',
        city: 'Cairo',
        paymentMethod: paymentMethod,
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          priceUSD: item.product.priceUSD,
          priceEGP: Math.round(item.product.priceUSD * 49),
          image: item.product.image
        })),
        totalUSD: totalUSD,
        totalEGP: Math.round(totalUSD * 49),
        courierNotes: paymentMethod === 'cod' ? 'Cash on Delivery — Collect in Cairo' : 'Card Payment'
      });

      setOrderId(placedOrder.id);
      setCheckoutStep('confirmed');
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    closeCart();
    if (checkoutStep === 'confirmed') {
      setCheckoutStep('cart');
    }
  };

  const percentToFreeShipping = Math.min(100, Math.round(((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={handleClose} />

      <aside aria-label="Shopping bag" className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#DDD8CD] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E6E2D8] flex items-center justify-between bg-[#FAF9F5]">
            <div className="flex items-center gap-2">
              <span className="text-sm uppercase font-mono tracking-widest text-neutral-500">
                {checkoutStep === 'cart' && 'Your Bag'}
                {checkoutStep === 'checkout' && 'Considered Checkout'}
                {checkoutStep === 'confirmed' && 'Order Received'}
              </span>
              {checkoutStep === 'cart' && (
                <span className="text-xs font-mono text-neutral-400">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* VIEW 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              <>
                {/* Free Shipping Progress Meter */}
                <div className="p-4 bg-[#F2EFE8] border border-[#DDD8CD] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-neutral-700">
                      <Truck className="w-3.5 h-3.5" />
                      {amountUntilFreeShipping === 0
                        ? 'Complimentary Carbon-Neutral Dispatch Unlocked'
                        : `Add ${formatPrice(amountUntilFreeShipping)} for complimentary dispatch`}
                    </span>
                  </div>

                  <div className="w-full bg-[#DDD8CD] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-neutral-900 h-full transition-all duration-500"
                      style={{ width: `${percentToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <p className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                      Your bag is empty
                    </p>
                    <p className="text-xs text-neutral-500 font-light max-w-xs mx-auto">
                      Explore Edition 04 for permanent wardrobe archetypes crafted from natural fibers.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-4 px-5 py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Browse Garments
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white border border-[#E8E4DA] flex gap-4 relative group"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-24 object-cover bg-neutral-100 shrink-0"
                        />

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs font-medium text-neutral-900 leading-snug">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-neutral-400 hover:text-red-700 transition-colors cursor-pointer"
                                title="Remove item"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-[11px] font-mono text-neutral-500 mt-1 space-x-2">
                              <span>Size: <strong className="text-neutral-700">{item.size}</strong></span>
                              <span>·</span>
                              <span>Color: <strong className="text-neutral-700">{item.color}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#F2EFE8]">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-[#DDD8CD] bg-[#FAF9F5]">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-xs font-mono hover:bg-neutral-200 cursor-pointer text-neutral-600"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-xs font-mono tabular-nums text-neutral-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs font-mono hover:bg-neutral-200 cursor-pointer text-neutral-600"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-xs font-mono tabular-nums font-medium text-neutral-900">
                              {formatPrice(item.product.priceUSD * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* VIEW 2: CHECKOUT DETAILS FORM */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                <div className="text-xs uppercase font-mono tracking-wider text-neutral-500 border-b border-[#E6E2D8] pb-2">
                  Shipping &amp; Client Details
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-mono text-neutral-600 uppercase mb-1 text-[11px]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD8CD] text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-neutral-600 uppercase mb-1 text-[11px]">
                      Email (for dispatch tracking)
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={e => setFormEmail(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD8CD] text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-neutral-600 uppercase mb-1 text-[11px]">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formAddress}
                      onChange={e => setFormAddress(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD8CD] text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-neutral-600 uppercase mb-1 text-[11px]">
                      City
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="Cairo"
                      className="w-full p-2.5 bg-neutral-100 border border-[#DDD8CD] text-neutral-900 font-mono text-xs cursor-default select-none"
                    />
                    <p className="text-[10px] font-mono text-neutral-400 mt-1">
                      Delivery available exclusively within Cairo &amp; Greater Cairo
                    </p>
                  </div>
                </div>

                <div className="text-xs uppercase font-mono tracking-wider text-neutral-500 border-b border-[#E6E2D8] pb-2 pt-2">
                  Payment Method
                </div>

                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 border cursor-pointer ${paymentMethod === 'card' ? 'border-black bg-white' : 'border-[#DDD8CD] bg-neutral-50'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-black"
                      />
                      <span className="text-xs font-mono font-medium">Credit / Debit Card</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">Visa · Mastercard</span>
                  </label>

                  <label className={`flex items-center justify-between p-3 border cursor-pointer ${paymentMethod === 'cod' ? 'border-black bg-white' : 'border-[#DDD8CD] bg-neutral-50'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-black"
                      />
                      <span className="text-xs font-mono font-medium">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">Pay when order arrives</span>
                  </label>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-2.5 px-4 border border-[#DDD8CD] text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 bg-[#191919] text-[#FAF9F5] text-xs font-medium uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? 'Securing Order...' : `Place Order · ${formatPrice(totalUSD)}`}
                  </button>
                </div>
              </form>
            )}

            {/* VIEW 3: ORDER CONFIRMATION */}
            {checkoutStep === 'confirmed' && (
              <div className="py-8 space-y-6 text-center">
                <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Order Confirmed
                  </span>
                  <h3 className="text-2xl font-light text-neutral-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Thank you, {formName || 'Collector'}.
                  </h3>
                  <p className="text-xs font-mono text-neutral-600">
                    Reference: <strong className="text-black font-semibold">{orderId}</strong>
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#DDD8CD] text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-500">Dispatch Status</span>
                    <span className="text-emerald-700 font-medium">Preparing at Biella Atelier</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-500">Estimated Delivery</span>
                    <span>3–4 Business Days</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-500">Destination</span>
                    <span className="text-right truncate max-w-[180px]">{formAddress || 'Delivered to provided address'}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-500">Total Charged</span>
                    <span className="font-semibold">{formatPrice(totalUSD)}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  A receipt and carbon-neutral transit certificate have been logged. Every piece includes our complimentary lifetime garment maintenance guarantee.
                </p>

                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            )}

          </div>

          {/* Footer Subtotal & Action Bar (for View 1) */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-6 border-t border-[#E6E2D8] bg-[#FAF9F5] space-y-4">
              
              {/* Promo Code Input */}
              <div className="space-y-1">
                {promoCode ? (
                  <div className="flex items-center justify-between text-xs font-mono p-2 bg-[#EFECE4] border border-[#DDD8CD]">
                    <span className="text-neutral-800">
                      Code applied: <strong className="font-semibold">{promoCode}</strong> (-10%)
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-neutral-500 hover:text-black text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try SIMPLE10)"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-[#DDD8CD] text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-black placeholder:normal-case placeholder:tracking-normal"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 border border-black text-xs font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 font-mono mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotalUSD)}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Atelier Privilege Discount</span>
                    <span className="tabular-nums">-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Carbon-Neutral Dispatch</span>
                  <span className="tabular-nums">
                    {shippingUSD === 0 ? 'Complimentary' : formatPrice(shippingUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-[#E8E4DA]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                <span>30-Day Guaranteed Returns · Recycled Packaging</span>
              </div>

            </div>
          )}

        </div>
      </aside>
    </div>
  );
};
