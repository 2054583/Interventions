import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  
  prenomForm: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.prenomForm = this.fb.group({
        prenom: ['',[Validators.minLength(3), Validators.required]]    
    });
}

}
