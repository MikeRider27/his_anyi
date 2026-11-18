<template>
  <div class="takecash">
    <p class="takecash-title">Cobros</p>
    <!-- Handle the payment form -->
    <el-form :model="takecash" :rules="rules" ref="takecashForm" label-position="top" class="takecash-ruleForm">
      <el-form-item label="Nombre del paciente" prop="patientName">
        <el-input v-model="takecash.patientName"></el-input>
      </el-form-item>
      <el-form-item label="Documento" prop="certificate_value">
        <el-select v-model="takecash.certificate_value" placeholder="Seleccione el documento">
          <el-option label="DNI" value="idCard"></el-option>
          <el-option label="Certificado de salud" value="healthCard"></el-option>
        </el-select>
      </el-form-item>
      <div class="takecash-isshow" v-if="takecash.certificate_value === 'idCard'">
        <el-form-item label="Número de DNI" prop="cardNumber">
          <el-input v-model="takecash.cardNumber"></el-input>
        </el-form-item>
      </div>
      <div class="takecash-isshow" v-else-if="takecash.certificate_value === 'healthCard'">
        <el-form-item label="Número de certificado de salud" prop="cardNumber">
          <el-input v-model="takecash.cardNumber"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="Número de receta" prop="prescript_number">
        <el-input v-model="number"></el-input>
      </el-form-item>
      <!-- Watch the value of number in real time; if found it is assigned to isShow, so isShow also updates in real time -->
      <!-- If the prescription number is found, show its drugs; otherwise hide the table-->
      <template  v-if="number === isShow && number !== ''">
        <el-table :data="takecash.prescription" class="payment-prescription">
          <el-table-column prop="sort" label="Categoría">
          </el-table-column>
          <el-table-column prop="drugname" label="Nombre del medicamento">
          </el-table-column>
          <el-table-column prop="quantity" label="Cantidad (uds./g)">
          </el-table-column>
          <el-table-column prop="usage" label="Posología">
          </el-table-column>                
        </el-table>
      </template>
      <div class="takecash_p">
        <el-form-item label="Importe a cobrar (yuanes):" class="shouldMoney">
          <span v-show="showMoney" class="money">{{ takecash.shouldMoney }}</span>
        </el-form-item>
        <el-button type="primary" class="computeBtn" @click="compute()">Calcular importe a cobrar</el-button>
      </div>
      <el-form-item label="Importe recibido (yuanes):" prop="exactMoney" class="exactMoney">
        <el-input v-model="takecash.exactMoney"></el-input>
      </el-form-item>
      <div class="takecash_p">
        <el-form-item label="Cambio (yuanes):" class="theChange">
          <span v-show="showChange" class="money">{{ takecash.theChange }}</span>
        </el-form-item>
        <el-button type="primary" class="changeBtn" @click="change()">Calcular cambio</el-button>
      </div>
      <el-button type="reset" @click="resetForm('takecashForm')" class="reset">Restablecer</el-button>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      // Validates that the patient name exists
      let checkName = (rule, value, callback) => {
        for (let k = 0; k < this.patients.length; k++) {
          if (value !== this.patients[k].name) {
            callback(new Error('¡No existe ningún paciente con ese nombre!'));
          } else {
            callback();
          }
        }
      };
      // Validates that the prescription exists
      let checkPrescription = (rule, value, callback) => {
        for (let k = 0; k < this.patients.length; k++) {
          if (value !== this.patients[k].number) {
            callback(new Error('¡No existe esa receta!'));
          } else {
            callback();
          }
        }
      };
      // Validates that the amount received is numeric
      let checkexactMoney = (rule, value, callback) => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('¡Introduzca el importe recibido!'));
        } else {
          if ((value - this.takecash.shouldMoney) < 0) {
            callback(new Error('¡Introduzca el importe recibido!'));
          } else {
            callback();
          }
        }
      };
      // Validates that the ID card number matches the name and has a valid format
      let checkCertificate = (rule, value, callback) => {
        if (/^\d+$/.test(value) !== false) {
          if (value.length !== 18) {
            callback(new Error('¡El número de DNI debe tener 18 dígitos!'));
          } else {
            for (let k = 0; k < this.patients.length; k++) {
              if (value === this.patients[k].idCard) {
                if (this.patients[k].name === this.takecash.patientName) {
                  callback();
                } else {
                  callback(new Error('¡El número de DNI no corresponde al nombre!'));
                }
              } else {
                callback(new Error('¡El número de DNI no corresponde al nombre!'));
              }
            }
          }
        } else {
          callback(new Error('¡Introduzca un valor numérico!'));
        }
      };
      return {
        takecash: {
          patientName: '',
          certificate_value: '',
          cardNumber: '',
          prescript_number: '',
          prescription: [],
          shouldMoney: '',
          exactMoney: '',
          theChange: ''
        },
        number: '',   // Prescription number (watched)
        isShow: '',   // Holds the final value of the prescription number while being watched
        showMoney: false,
        showChange: false,
        patients: [],  // Holds patient info
        rules: {
          patientName: [
            {required: true, validator: checkName, trigger: 'blur'}
          ],
          certificate_value: [
            { required: true, message: 'Introduzca el número de documento', trigger: 'change' }
          ],
          cardNumber: [
            {required: true, validator: checkCertificate, trigger: 'blur'}
          ],
          prescript_number: [
            {required: true, validator: checkPrescription, trigger: 'blur'}
          ],
          exactMoney: [
            {required: true, validator: checkexactMoney, trigger: 'blur'}
          ]
        }
      };
    },
    created () {
      let takecashThis = this;
      takecashThis.$http.get(api.patientList).then((response) => {
        // Assign data fetched from the JSON API to the current object
        takecashThis.patients = response.data.tableData;
      }, response => {
        // error callback
        takecashThis.$notify.error({
          message: 'Error al solicitar los datos'
        });
      });
    },
    methods: {
      // Calculate amount due
      compute () {
        this.showMoney = true;
        this.$refs.takecashForm.validate((valid) => {
          if (!valid) {
            this.$notify.error({
              message: '¡Revise que todos los campos obligatorios estén completos!'
            });
          }
        });
      },
      // Reset
      resetForm (formName) {
        this.$refs.takecashForm.resetFields();
        this.isShow = '';
        this.number = '';
        this.showMoney = false;
        this.showChange = false;
      },
      // Change
      change () {
        this.$refs.takecashForm.validate((valid) => {
          if (valid) {
            if ((this.takecash.exactMoney - this.takecash.shouldMoney) < 0) {
              this.takecash.theChange = '¡El importe recibido es incorrecto!';
              this.showChange = true;
            } else {
              if (this.takecash.shouldMoney === '') {
                this.showChange = false;
              } else {
                this.takecash.theChange = this.takecash.exactMoney - this.takecash.shouldMoney;
                this.showChange = true;
              }
            }
          } else {
            this.$notify.error({
              message: '¡Revise que todos los campos obligatorios estén completos!'
            });
          }
        });
      }
    },
    // Watch number in real time; when a prescription number is entered, run the logic below
    // If the prescription number is found, store its drugs in the prescription[] array
    // Also assign the prescription number to this.isShow so the table visibility check above works
    watch: {
      number: function () {
        this.takecash.prescript_number = this.number;

        for (let i = 0; i < this.patients.length; i++) {
          if (this.patients[i].number === this.number) {
            this.takecash.prescription = this.patients[i].prescription.drug;
            this.isShow = this.patients[i].number;
            // Hardcoded data for now
            this.takecash.shouldMoney = 320;
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .takecash
    .takecash-title
      margin:0 0 24px
      color:#263b4d
      font-size:26px
      font-weight:600
      text-align:center

    .takecash-ruleForm
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      gap:8px 24px
      width:100%
      max-width:860px
      margin:0 auto

      > .el-form-item
        min-width:0
        margin-bottom:12px

      .el-select,
      .el-input
        width:100%

      .takecash-isshow
        display:contents

      .payment-prescription,
      .takecash_p,
      .exactMoney,
      .reset
        grid-column:1 / -1

      .payment-prescription
        margin:4px 0 12px

      .takecash_p
        box-sizing:border-box
        display:grid
        grid-template-columns:minmax(0, 1fr) auto
        align-items:end
        gap:16px
        margin:0 0 8px
        padding:16px
        border:1px solid #e4ebef
        border-radius:10px
        background:#f8fafb

        .el-form-item
          min-width:0
          margin:0

        .money
          display:block
          min-height:40px
          color:#167d77
          font-size:20px
          font-weight:600
          line-height:40px

      .reset
        justify-self:center
        margin-top:8px

  @media (max-width: 700px)
    .takecash
      .takecash-ruleForm
        grid-template-columns:minmax(0, 1fr)

        .takecash_p
          grid-template-columns:minmax(0, 1fr)
          gap:8px

          .el-button
            justify-self:start
</style>
