import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private form = viewChild.required<NgForm>("form");
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const subscription = this.form().valueChanges?.subscribe({
        next: (value) => console.log(value),
      });
      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    console.log(formData.form.value.email);
    console.log(formData.form.value.password);

    formData.form.reset();
  }
}
