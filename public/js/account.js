$(document).ready(function () {
  var publishableKey =
    "pk_test_51HrS4KJKmVlFmiJDlkVnFCAQ8qDSPPSlspKeYAvilq2EpR0hIjBG6VU4jJA9WC99ffXAyw9Cr09mLX6Dh0Lela6A00JxmOyIf4";

  var stripe = Stripe(publishableKey);

  var checkoutButton = $("#checkout-button");

  checkoutButton.click(function () {
    console.log("checkout clicked!");

    fetch("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(({ sessionId }) => stripe.redirectToCheckout({ sessionId }));
  });
});
