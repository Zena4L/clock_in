import clockin from "./clockin";

const clockinForm = document.querySelector('.clockin') as HTMLFormElement;


if (clockinForm) {
    clockinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const phone = (document.getElementById('phone') as HTMLInputElement).value;
      const purpose = (document.getElementById('purpose') as HTMLInputElement).value;
      const status = (document.getElementById('status') as HTMLInputElement).value;

      console.log({name,phone,purpose,status})
      clockin(name,phone,purpose,status)
    });
  }
  

  