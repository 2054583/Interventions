import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from 'src/shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: any;
  constructor(private fb: FormBuilder, private typeproblemeService: TypeProblemeService){}

  ngOnInit(){
    this.problemeForm = this.fb.group({
        prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        nom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        noTypeProbleme: ['',Validators.required]
    });

    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(cat => this.typesProbleme = cat,
                   error => this.errorMessage = <any>error); 
}

save(): void {
}

}
