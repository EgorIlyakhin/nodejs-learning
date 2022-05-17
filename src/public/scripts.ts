document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  window.M.FormSelect.init(document.querySelectorAll('select'), {});

  const cart = document.querySelector('.cart');

  if (cart) {
    cart.addEventListener('click', e => {
      const button = e?.target as HTMLButtonElement;
      const table = cart.querySelector('tbody');
      const price = cart.querySelector('.price');

      if (button.classList.contains('js-remove')) {
        const id = button.dataset.id;

        fetch(`/cart/remove/${id}`, {
          method: 'delete',
        })
          .then(res => res.json())
          .then(({ list, price: sum }) => {
            if (list.length && table && price) {
              table.innerHTML = list
                .map(
                  ({ name, count, price, id }) =>
                    `
                <tr>
                  <td>${name}</td>
                  <td>${count}</td>
                  <td>${price}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id="${id}">Delete</button>
                  </td>
                </tr>
                `
                )
                .join('');
              price.textContent = sum;
            } else {
              cart.innerHTML = '<p>Empty cart</p>';
            }
          });
      }
    });
  }
});
