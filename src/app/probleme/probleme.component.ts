import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from 'src/shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';
import { emailMatcherValidator } from 'src/shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  probleme: IProbleme;
  errorMessage: any;
  constructor(private fb: FormBuilder, private typeproblemeService: TypeProblemeService, private problemeService: ProblemeService,
    private route: Router){}

  ngOnInit(){
    this.problemeForm = this.fb.group({
        prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        nom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        noTypeProbleme: ['', Validators.required], 
        courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}],
        notification : ['pasnotification'],
        descriptionProbleme:['', [Validators.required,Validators.minLength(5)]],
        noUnite:'',
        dateProbleme:{value: Date(), disabled: true}
      });         
    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(cat => this.typesProbleme = cat,
                   error => this.errorMessage = <any>error); 
                   this.problemeForm.get('notification').valueChanges
                    .subscribe(value => this.appliquerNotifications(value));
}

save(): void {
  if (this.problemeForm.dirty && this.problemeForm.valid) {
      // Copy the form values over the problem object values
      this.probleme = this.problemeForm.value;
      this.probleme.id = 0;
      // Courriel est dans un groupe alors que this.probleme n'a pas de groupe.  Il faut le transférer explicitement.
       if(this.problemeForm.get('courrielGroup.courriel').value != '')
      {
        this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
      }
  
      this.problemeService.saveProbleme(this.probleme)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
        })
  } else if (!this.problemeForm.dirty) {
      this.onSaveComplete();
  }
}

onSaveComplete(): void {
  // Reset the form to clear the flags
  this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
  this.route.navigate(['/accueil']);
}

appliquerNotifications(notifyVia: string): void {
  const courrielGroupControl = this.problemeForm.get('courrielGroup');
  const courrielControl = this.problemeForm.get('courrielGroup.courriel');
  const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
  const telephoneControl = this.problemeForm.get('telephone');
  
   // Tous remettre à zéro (plus simple)
   courrielControl.clearValidators();
   courrielControl.reset(); // Pour enlever les messages d'erreur si le controle contenait des données invaldides
   courrielControl.disable();
  
  courrielConfirmationControl.clearValidators();
  courrielConfirmationControl.reset();
  courrielConfirmationControl.disable();
  
  
  telephoneControl.clearValidators();
  telephoneControl.reset(); // Pour enlever les messages d'erreur dûs à dirty, etc.. 
  telephoneControl.disable();
  
  if (notifyVia === 'courriel') {
    courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
    courrielControl.setValidators([Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
    courrielConfirmationControl.setValidators([Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
    courrielControl.enable();
    courrielConfirmationControl.enable();
    } else {
   if (notifyVia === 'messageTexte') {
   telephoneControl.setValidators([Validators.required, Validators.minLength(10),  Validators.maxLength(10), Validators.pattern('[0-9]+')]);
   telephoneControl.enable();
   }
   }
   courrielControl.updateValueAndValidity();
   courrielConfirmationControl.updateValueAndValidity();
   telephoneControl.updateValueAndValidity();
  }
}
