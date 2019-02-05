"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/** Error any time control is invalid */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control) {
        if (control) {
            return control.invalid;
        }
        return false;
    };
    return MyErrorStateMatcher;
}());
exports.MyErrorStateMatcher = MyErrorStateMatcher;
var SelectDemo = /** @class */ (function () {
    function SelectDemo() {
        this.drinksRequired = false;
        this.drinkObjectRequired = false;
        this.pokemonRequired = false;
        this.drinksDisabled = false;
        this.pokemonDisabled = false;
        this.showSelect = false;
        this.currentDrinkObject = { value: 'tea-5', viewValue: 'Tea' };
        this.floatLabel = 'auto';
        this.foodControl = new forms_1.FormControl('pizza-1');
        this.topHeightCtrl = new forms_1.FormControl(0);
        this.drinksTheme = 'primary';
        this.pokemonTheme = 'primary';
        this.compareByValue = true;
        this.selectFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.foods = [
            { value: null, viewValue: 'None' },
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
        this.drinks = [
            { value: 'coke-0', viewValue: 'Coke' },
            { value: 'long-name-1', viewValue: 'Decaf Chocolate Brownie Vanilla Gingerbread Frappuccino' },
            { value: 'water-2', viewValue: 'Water' },
            { value: 'pepper-3', viewValue: 'Dr. Pepper' },
            { value: 'coffee-4', viewValue: 'Coffee' },
            { value: 'tea-5', viewValue: 'Tea' },
            { value: 'juice-6', viewValue: 'Orange juice' },
            { value: 'wine-7', viewValue: 'Wine' },
            { value: 'milk-8', viewValue: 'Milk' },
        ];
        this.pokemon = [
            { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
            { value: 'charizard-1', viewValue: 'Charizard' },
            { value: 'squirtle-2', viewValue: 'Squirtle' },
            { value: 'pikachu-3', viewValue: 'Pikachu' },
            { value: 'jigglypuff-4', viewValue: 'Jigglypuff with a really long name that will truncate' },
            { value: 'ditto-5', viewValue: 'Ditto' },
            { value: 'psyduck-6', viewValue: 'Psyduck' },
        ];
        this.availableThemes = [
            { value: 'primary', name: 'Primary' },
            { value: 'accent', name: 'Accent' },
            { value: 'warn', name: 'Warn' }
        ];
        this.pokemonGroups = [
            {
                name: 'Grass',
                pokemon: [
                    { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
                    { value: 'oddish-1', viewValue: 'Oddish' },
                    { value: 'bellsprout-2', viewValue: 'Bellsprout' }
                ]
            },
            {
                name: 'Water',
                pokemon: [
                    { value: 'squirtle-3', viewValue: 'Squirtle' },
                    { value: 'psyduck-4', viewValue: 'Psyduck' },
                    { value: 'horsea-5', viewValue: 'Horsea' }
                ]
            },
            {
                name: 'Fire',
                disabled: true,
                pokemon: [
                    { value: 'charmander-6', viewValue: 'Charmander' },
                    { value: 'vulpix-7', viewValue: 'Vulpix' },
                    { value: 'flareon-8', viewValue: 'Flareon' }
                ]
            },
            {
                name: 'Psychic',
                pokemon: [
                    { value: 'mew-9', viewValue: 'Mew' },
                    { value: 'mewtwo-10', viewValue: 'Mewtwo' },
                ]
            }
        ];
        this.digimon = [
            { value: 'mihiramon-0', viewValue: 'Mihiramon' },
            { value: 'sandiramon-1', viewValue: 'Sandiramon' },
            { value: 'sinduramon-2', viewValue: 'Sinduramon' },
            { value: 'pajiramon-3', viewValue: 'Pajiramon' },
            { value: 'vajiramon-4', viewValue: 'Vajiramon' },
            { value: 'indramon-5', viewValue: 'Indramon' }
        ];
        this.matcher = new MyErrorStateMatcher();
    }
    SelectDemo.prototype.toggleDisabled = function () {
        this.foodControl.enabled ? this.foodControl.disable() : this.foodControl.enable();
    };
    SelectDemo.prototype.setPokemonValue = function () {
        this.currentPokemon = ['jigglypuff-4', 'psyduck-6'];
    };
    SelectDemo.prototype.reassignDrinkByCopy = function () {
        this.currentDrinkObject = __assign({}, this.currentDrinkObject);
    };
    SelectDemo.prototype.compareDrinkObjectsByValue = function (d1, d2) {
        return d1 && d2 && d1.value === d2.value;
    };
    SelectDemo.prototype.compareByReference = function (o1, o2) {
        return o1 === o2;
    };
    SelectDemo.prototype.toggleSelected = function () {
        this.currentAppearanceValue = this.currentAppearanceValue ? null : this.digimon[0].value;
    };
    SelectDemo = __decorate([
        core_1.Component({selector: 'select-demo',
            template: " <mat-card class=\"demo-card demo-basic\"> <mat-toolbar color=\"primary\">Native Select</mat-toolbar> <mat-card-content> <form> <h4>Basic</h4> <mat-form-field class=\"demo-full-width\"> <mat-label>Select your car</mat-label> <select matNativeControl id=\"mySelectId\"> <option value=\"\" disabled selected></option> <option value=\"volvo\">Volvo</option> <option value=\"saab\" disabled>Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <h4>Disabled and required</h4> <mat-form-field class=\"demo-full-width\"> <mat-label>Select your car (disabled)</mat-label> <select matNativeControl disabled required> <option value=\"volvo\">Volvo</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <h4>Floating label</h4> <mat-form-field> <mat-label>Float with value</mat-label> <select matNativeControl> <option value=\"volvo\">Volvo</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <mat-form-field> <mat-label>Not float when empty</mat-label> <select matNativeControl> <option value=\"\" selected></option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <mat-form-field> <mat-label>Float with no value, but with label</mat-label> <select matNativeControl> <option value=\"\" selected label=\"--select one--\"></option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <mat-form-field> <mat-label>Float with no value, but with html</mat-label> <select matNativeControl> <option value=\"\" selected>--select one--</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <h4>Looks</h4> <mat-form-field appearance=\"legacy\"> <mat-label>Legacy</mat-label> <select matNativeControl required> <option value=\"volvo\">Volvo</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <mat-form-field appearance=\"standard\"> <mat-label>Standard</mat-label> <select matNativeControl required> <option value=\"volvo\">Volvo</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <mat-form-field appearance=\"fill\"> <mat-label>Fill</mat-label> <select matNativeControl required> <option value=\"\" selected></option> <option value=\"volvo\">Volvo</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <mat-form-field appearance=\"outline\"> <mat-label>Outline</mat-label> <select matNativeControl> <option value=\"\" selected></option> <option value=\"volvo\">volvo</option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <h4>Option group</h4> <mat-form-field> <select matNativeControl> <optgroup label=\"Swedish Cars\"> <option value=\"volvo\">volvo</option> <option value=\"saab\">Saab</option> </optgroup> <optgroup label=\"German Cars\"> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </optgroup> </select> </mat-form-field> <h4>Place holder</h4> <mat-form-field class=\"demo-full-width\"> <select matNativeControl placeholder=\"place holder\"> <option value=\"\" disabled selected></option> <option value=\"volvo\">Volvo</option> <option value=\"saab\" disabled>Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> </mat-form-field> <h4>Error message, hint, form sumbit</h4> <mat-form-field class=\"demo-full-width\"> <mat-label>Select your car (required)</mat-label> <select matNativeControl required [formControl]=\"selectFormControl\"> <option label=\"--select something --\"></option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> <mat-error *ngIf=\"selectFormControl.hasError('required')\"> This field is required </mat-error> <mat-hint>You can pick up your favorite car here</mat-hint> </mat-form-field> <h4>Error message with errorStateMatcher</h4> <mat-form-field class=\"demo-full-width\"> <mat-label>Select your car</mat-label> <select matNativeControl required [formControl]=\"selectFormControl\" [errorStateMatcher]=\"matcher\"> <option label=\"--select something --\"></option> <option value=\"saab\">Saab</option> <option value=\"mercedes\">Mercedes</option> <option value=\"audi\">Audi</option> </select> <mat-error *ngIf=\"selectFormControl.hasError('required')\"> This field is required </mat-error> <mat-hint>You can pick up your favorite car here</mat-hint> </mat-form-field> <button color=\"primary\" mat-raised-button>Submit</button> </form> </mat-card-content> </mat-card> <mat-toolbar color=\"primary\">mat-select</mat-toolbar> Space above cards: <input type=\"number\" [formControl]=\"topHeightCtrl\"> <button mat-button (click)=\"showSelect=!showSelect\">SHOW SELECT</button> <div [style.height.px]=\"topHeightCtrl.value\"></div> <div class=\"demo-select\"> <mat-card> <mat-card-subtitle>ngModel</mat-card-subtitle> <mat-form-field [floatLabel]=\"floatLabel\" [color]=\"drinksTheme\"> <mat-label>Drink</mat-label> <mat-select [(ngModel)]=\"currentDrink\" [required]=\"drinksRequired\" [disabled]=\"drinksDisabled\" #drinkControl=\"ngModel\"> <mat-option>None</mat-option> <mat-option *ngFor=\"let drink of drinks\" [value]=\"drink.value\" [disabled]=\"drink.disabled\"> {{ drink.viewValue }} </mat-option> </mat-select> <mat-icon matPrefix class=\"demo-drink-icon\">local_drink</mat-icon> <mat-hint>Pick a drink!</mat-hint> <mat-error>You must make a selection</mat-error> </mat-form-field> <p> Value: {{ currentDrink }} </p> <p> Touched: {{ drinkControl.touched }} </p> <p> Dirty: {{ drinkControl.dirty }} </p> <p> Status: {{ drinkControl.control?.status }} </p> <p> <label for=\"floating-placeholder\">Floating placeholder:</label> <select [(ngModel)]=\"floatLabel\" id=\"floating-placeholder\"> <option value=\"auto\">Auto</option> <option value=\"always\">Always</option> <option value=\"never\">Never</option> </select> </p> <p> <label for=\"drinks-theme\">Theme:</label> <select [(ngModel)]=\"drinksTheme\" id=\"drinks-theme\"> <option *ngFor=\"let theme of availableThemes\" [value]=\"theme.value\"> {{theme.name}} </option> </select> </p> <button mat-button (click)=\"currentDrink='water-2'\">SET VALUE</button> <button mat-button (click)=\"drinksRequired=!drinksRequired\">TOGGLE REQUIRED</button> <button mat-button (click)=\"drinksDisabled=!drinksDisabled\">TOGGLE DISABLED</button> <button mat-button (click)=\"drinkControl.reset()\">RESET</button> </mat-card> <mat-card> <mat-card-subtitle>Multiple selection</mat-card-subtitle> <mat-card-content> <mat-form-field [color]=\"pokemonTheme\"> <mat-label>Pokemon</mat-label> <mat-select multiple [(ngModel)]=\"currentPokemon\" [required]=\"pokemonRequired\" [disabled]=\"pokemonDisabled\" #pokemonControl=\"ngModel\"> <mat-option *ngFor=\"let creature of pokemon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-select> </mat-form-field> <p> Value: {{ currentPokemon }} </p> <p> Touched: {{ pokemonControl.touched }} </p> <p> Dirty: {{ pokemonControl.dirty }} </p> <p> Status: {{ pokemonControl.control?.status }} </p> <p> <label for=\"pokemon-theme\">Theme:</label> <select [(ngModel)]=\"pokemonTheme\" id=\"pokemon-theme\"> <option *ngFor=\"let theme of availableThemes\" [value]=\"theme.value\">{{ theme.name }}</option> </select> </p> <button mat-button (click)=\"setPokemonValue()\">SET VALUE</button> <button mat-button (click)=\"pokemonRequired=!pokemonRequired\">TOGGLE REQUIRED</button> <button mat-button (click)=\"pokemonDisabled=!pokemonDisabled\">TOGGLE DISABLED</button> <button mat-button (click)=\"pokemonControl.reset()\">RESET</button> </mat-card-content> </mat-card> <mat-card> <mat-card-subtitle>Without Angular forms</mat-card-subtitle> <mat-form-field> <mat-label>Digimon</mat-label> <mat-select [(value)]=\"currentDigimon\"> <mat-option>None</mat-option> <mat-option *ngFor=\"let creature of digimon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-select> </mat-form-field> <p>Value: {{ currentDigimon }}</p> <button mat-button (click)=\"currentDigimon='pajiramon-3'\">SET VALUE</button> <button mat-button (click)=\"currentDigimon=''\">RESET</button> </mat-card> <mat-card> <mat-card-subtitle>Option groups</mat-card-subtitle> <mat-card-content> <mat-form-field> <mat-label>Pokemon</mat-label> <mat-select [(ngModel)]=\"currentPokemonFromGroup\"> <mat-optgroup *ngFor=\"let group of pokemonGroups\" [label]=\"group.name\" [disabled]=\"group.disabled\"> <mat-option *ngFor=\"let creature of group.pokemon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-optgroup> </mat-select> </mat-form-field> </mat-card-content> </mat-card> <mat-card> <mat-card-subtitle>compareWith</mat-card-subtitle> <mat-card-content> <mat-form-field [color]=\"drinksTheme\"> <mat-label>Drink</mat-label> <mat-select [(ngModel)]=\"currentDrinkObject\" [required]=\"drinkObjectRequired\" [compareWith]=\"compareByValue ? compareDrinkObjectsByValue : compareByReference\" #drinkObjectControl=\"ngModel\"> <mat-option *ngFor=\"let drink of drinks\" [value]=\"drink\" [disabled]=\"drink.disabled\"> {{ drink.viewValue }} </mat-option> </mat-select> </mat-form-field> <p> Value: {{ currentDrinkObject | json }} </p> <p> Touched: {{ drinkObjectControl.touched }} </p> <p> Dirty: {{ drinkObjectControl.dirty }} </p> <p> Status: {{ drinkObjectControl.control?.status }} </p> <p> Comparison Mode: {{ compareByValue ? 'VALUE' : 'REFERENCE' }} </p> <button mat-button (click)=\"reassignDrinkByCopy()\" matTooltip=\"This action should clear the display value when comparing by reference.\"> REASSIGN DRINK BY COPY </button> <button mat-button (click)=\"drinkObjectRequired=!drinkObjectRequired\">TOGGLE REQUIRED</button> <button mat-button (click)=\"compareByValue=!compareByValue\">TOGGLE COMPARE BY VALUE</button> <button mat-button (click)=\"drinkObjectControl.reset()\">RESET</button> </mat-card-content> </mat-card> <mat-card> <mat-card-subtitle>Appearance comparison</mat-card-subtitle> <mat-card-content> <p> <mat-form-field> <mat-label>Legacy</mat-label> <mat-select [(value)]=\"currentAppearanceValue\"> <mat-option>None</mat-option> <mat-option *ngFor=\"let creature of digimon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-select> </mat-form-field> </p> <p> <mat-form-field appearance=\"standard\"> <mat-label>Standard</mat-label> <mat-select [(value)]=\"currentAppearanceValue\"> <mat-option>None</mat-option> <mat-option *ngFor=\"let creature of digimon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-select> </mat-form-field> </p> <p> <mat-form-field appearance=\"fill\"> <mat-label>Fill</mat-label> <mat-select [(value)]=\"currentAppearanceValue\"> <mat-option>None</mat-option> <mat-option *ngFor=\"let creature of digimon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-select> </mat-form-field> </p> <p> <mat-form-field appearance=\"outline\"> <mat-label>Outline</mat-label> <mat-select [(value)]=\"currentAppearanceValue\"> <mat-option>None</mat-option> <mat-option *ngFor=\"let creature of digimon\" [value]=\"creature.value\"> {{ creature.viewValue }} </mat-option> </mat-select> </mat-form-field> </p> <button mat-button (click)=\"toggleSelected()\">TOGGLE SELECTED</button> </mat-card-content> </mat-card> <div *ngIf=\"showSelect\"> <mat-card> <mat-card-subtitle>formControl</mat-card-subtitle> <mat-card-content> <mat-form-field> <mat-label>Food I would like to eat</mat-label> <mat-select [formControl]=\"foodControl\"> <mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">{{ food.viewValue }}</mat-option> </mat-select> </mat-form-field> <p> Value: {{ foodControl.value }} </p> <p> Touched: {{ foodControl.touched }} </p> <p> Dirty: {{ foodControl.dirty }} </p> <p> Status: {{ foodControl.status }} </p> <button mat-button (click)=\"foodControl.setValue('pizza-1')\">SET VALUE</button> <button mat-button (click)=\"toggleDisabled()\">TOGGLE DISABLED</button> <button mat-button (click)=\"foodControl.reset()\">RESET</button> </mat-card-content> </mat-card> </div> <div *ngIf=\"showSelect\"> <mat-card> <mat-card-subtitle>Change event</mat-card-subtitle> <mat-card-content> <mat-form-field> <mat-label>Starter pokemon</mat-label> <mat-select (change)=\"latestChangeEvent = $event\"> <mat-option *ngFor=\"let creature of pokemon\" [value]=\"creature.value\">{{ creature.viewValue }}</mat-option> </mat-select> </mat-form-field> <p> Change event value: {{ latestChangeEvent?.value }} </p> </mat-card-content> </mat-card> </div> </div> <div style=\"height: 500px\">This div is for testing scrolled selects.</div> ",
            styles: [".demo-select { display: flex; flex-flow: row wrap; } .demo-select .mat-card { width: 450px; margin: 24px; } .demo-select .demo-drink-icon { vertical-align: bottom; padding-right: 0.25em; } .demo-card { margin-bottom: 30px; } "],
        })
    ], SelectDemo);
    return SelectDemo;
}());
exports.SelectDemo = SelectDemo;
//# sourceMappingURL=select-demo.js.map