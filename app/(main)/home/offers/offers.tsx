export default function Offers() {
  const offersList = [
    "✦ HOMEMADE BIHARI FLAVOURS",
    "✦ FREE SHIPPING ABOVE ₹699",
    "✦ RAZORPAY TEST CHECKOUT",
    "✦ SMALL-BATCH GOODNESS",
    "✦ SAHARA INDIA SMALL-BATCH GOODNESS",
    "BEST OF THE BEST DEA; OF THE YEAR",
    "✦ HOMEMADE BIHARI FLAVOURS",
    "✦ FREE SHIPPING ABOVE ₹699",
    "✦ RAZORPAY TEST CHECKOUT",
    "✦ SMALL-BATCH GOODNESS",
    "✦ SAHARA INDIA SMALL-BATCH GOODNESS",
    "BEST OF THE BEST DEA; OF THE YEAR",
    "✦ HOMEMADE BIHARI FLAVOURS",
    "✦ FREE SHIPPING ABOVE ₹699",
    "✦ RAZORPAY TEST CHECKOUT",
    "✦ SMALL-BATCH GOODNESS",
    "✦ SAHARA INDIA SMALL-BATCH GOODNESS",
    "BEST OF THE BEST DEA; OF THE YEAR",
  ];
  return (
    <div className="bg-accent">
      <div className="h-10.5 px-2 whitespace-nowrap text-accent-foreground font-serif text-[12px] font-extrabold flex flex-nowrap items-center gap-4 overflow-hidden  animate-marquee">
        {offersList.map((o) => (
          <OfferItems text={o} />
        ))}
      </div>
    </div>
  );
}
type offer = {
  text: string;
};

function OfferItems({ text }: offer) {
  return <span className="">{text}</span>;
}
