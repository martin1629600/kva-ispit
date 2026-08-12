import Swal from 'sweetalert2';

const matCustomClass = {
  popup: 'mat-swal-popup',
  title: 'mat-swal-title',
  actions: 'mat-swal-actions',
  confirmButton: 'mat-swal-confirm',
  cancelButton: 'mat-swal-cancel',
};
export class Alerts {
  static success(text: string) {
    Swal.fire({
      title: 'Success',
      text,
      icon: 'success',
      customClass: matCustomClass,
    });
  }

  static fail(text: string) {
    Swal.fire({
      title: 'Fail',
      text,
      icon: 'error',
      customClass: matCustomClass,
    });
  }

  static confirm(text: string, callback: Function) {
    Swal.fire({
      title: 'Are you sure?',
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d630b2',
      cancelButtonColor: 'rgb(0, 0, 0)',
      confirmButtonText: 'Yes',
      customClass: matCustomClass,
    }).then((result) => {
      if (result.isConfirmed) callback();
    });
  }
}
