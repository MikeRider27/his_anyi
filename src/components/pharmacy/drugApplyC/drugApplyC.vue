<template>
  <div class="drugApplyC">
    <el-form label-width="120px" :model="applytable" :rules="rules" ref="applyform" class="apply-form">
      <h4 class="applytable">Solicitud de reabastecimiento de medicamentos</h4>
      <p class="radio-p">
        <el-radio label="1" v-model="applytable.checked">Medicina china</el-radio>
        <el-radio label="2" disabled>Medicina occidental</el-radio>
      </p>
      <el-form-item label="Nombre del medicamento" prop="drugname">
        <el-input v-model="applytable.drugname"></el-input>
      </el-form-item>
      <el-form-item label="OTCMarca" prop="otc_value">
        <el-select v-model="applytable.otc_value" placeholder="Seleccione">
          <el-option
            v-for="item in OTC"
            :key="item.otc_value"
            :label="item.label"
            :value="item.otc_value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Forma farmacéutica" prop="form_value">
        <el-select v-model="applytable.form_value" placeholder="Seleccione">
          <el-option
            v-for="f in form"
            :key="f.form_value"
            :label="f.label"
            :value="f.form_value">
          </el-option>
        </el-select>
      </el-form-item>              
      <el-form-item label="Presentación" prop="drugform">
        <el-input v-model="applytable.drugform"></el-input>
      </el-form-item>
      <el-form-item label="Cantidad (uds.)" prop="drugquantity">
        <el-input v-model="applytable.drugquantity"></el-input>
      </el-form-item>
      <el-form-item label="Solicitante" prop="applyman">
        <el-input v-model="applytable.applyman"></el-input>
      </el-form-item>
      <el-form-item label="Departamento solicitante" prop="applyoffices">
        <el-input v-model="applytable.applyoffices"></el-input>
      </el-form-item>      
      <el-form-item label="Fecha de solicitud" prop="date">
        <el-date-picker v-model="applytable.date" type="date" placeholder="Seleccione una fecha"></el-date-picker>
      </el-form-item>
      <p  class="submit">
        <el-button type="reset" @click="resetApply">Restablecer solicitud</el-button>
        <el-button type="submit" @click="submitApply">Enviar solicitud</el-button>
      </p>         
    </el-form>
    <h4 class="tips">¡Los siguientes medicamentos tienen menos de 10 unidades en stock; se recomienda solicitar reabastecimiento!</h4>
    <el-table :data="insufficientTable" border class="insufficientTable">
      <el-table-column prop="drugname" label="Nombre del medicamento"></el-table-column>
      <el-table-column prop="type" label="Categoría"></el-table-column>
      <el-table-column prop="quantity" label="Stock"></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      let validatevalue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('¡Este campo no puede estar vacío!'));
        } else {
          callback();
        }
      };
      let checkquantity = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('¡Este campo no puede estar vacío!'));
        }
        setTimeout(() => {
          if (/^\d+$/.test(value) === false) {
            callback(new Error('¡Introduzca un valor numérico!'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        OTC: [
          {
            otc_value: 'Opción1',
            label: 'Con receta'
          },
          {
            otc_value: 'Opción2',
            label: 'Sin receta'
          }
        ],
        // Specification
        form: [
          {
            form_value: 'Opción1',
            label: 'Comprimidos'
          },
          {
            form_value: 'Opción2',
            label: 'Cápsulas'
          },
          {
            form_value: 'Opción3',
            label: 'Píldoras'
          },
          {
            form_value: 'Opción4',
            label: 'Polvos'
          },
          {
            form_value: 'Opción5',
            label: 'Gránulos'
          },
          {
            form_value: 'Opción6',
            label: 'Pomadas'
          },
          {
            form_value: 'Opción7',
            label: 'Líquidos'
          },
          {
            form_value: 'Opción8',
            label: 'Gases'
          },
          {
            form_value: 'Opción9',
            label: 'Inyectables'
          }
        ],
        // Holds the drug resupply request form data
        applytable: {
          drugname: '',
          drugform: '',
          drugquantity: '',
          applyoffices: '',
          applyman: '',
          checked: '1',
          otc_value: '',
          form_value: '',
          date: ''
        },
        rules: {
          drugname: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          drugform: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          drugquantity: [
            {validator: checkquantity, trigger: 'blur'}
          ],
          applyoffices: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          applyman: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          otc_value: [
            {validator: validatevalue, trigger: 'change'}
          ],
          form_value: [
            {validator: validatevalue, trigger: 'change'}
          ],
          date: [
            {validator: validatevalue, trigger: 'blur'}
          ]
        },
        // Low-stock drug table
        insufficientTable: []
      };
    },
    mounted () {
      this.getinsufficientData();
    },
    methods: {
      // Runs when the Submit request button is clicked
      submitApply: function () {
        this.$refs.applyform.validate((valid) => {
          if (valid) {
            this.$notify({
              message: 'Enviado correctamente',
              type: 'success'
            });
            // Test
            // Send data to the backend (no backend API yet)
            // this.$http.post('', {applytable: 'this.applytable'}).then(response => {}, response => {});
          } else {
            this.$notify.error({
              message: 'Error al enviar'
            });
            return false;
          }
        });
      },
      // Runs when the Reset request button is clicked
      resetApply: function () {
        // Reset all data of the current vue instance
        this.$refs.applyform.resetFields();
      },
      // Fetch drugs with fewer than 10 units in stock
      getinsufficientData: function () {
        let drugapplyThis = this;

        drugapplyThis.$http.get(api.drugs, {params: {q: 1}}).then((response) => {
          // Data fetched from the JSON API
          for (let i = 0; i < response.data.tableDataC.length; i++) {
            if (response.data.tableDataC[i].quantity < 10) {
              drugapplyThis.insufficientTable.push(response.data.tableDataC[i]);
            }
          }
        }, response => {
          // error callback
          drugapplyThis.$notify.error({
            message: 'Error al solicitar los datos'
          });
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .drugApplyC .apply-form
    display:grid
    grid-template-columns:repeat(3, minmax(0, 1fr))
    gap:16px 24px
    width:100%

    .applytable,
    .radio-p,
    .submit
      grid-column:1 / -1

    .applytable
      margin:0
      color:#263b4d
      font-size:20px
      font-weight:600
      line-height:1.35
      text-align:center

    .radio-p
      display:flex
      justify-content:center
      gap:28px
      margin:0 0 4px
      line-height:1.4

    .el-form-item
      width:auto
      min-width:0
      margin:0
      padding:0

    .el-form-item__label
      float:none
      width:100% !important
      padding:0 0 6px
      line-height:1.4
      text-align:left
      white-space:normal

    .el-form-item__content
      min-width:0
      margin-left:0 !important

    .el-input,
    .el-select,
    .el-date-editor
      width:100%

    .submit
      display:flex
      justify-content:center
      gap:10px
      margin:8px 0 0

  .drugApplyC .tips
    margin:22px 0 14px
    padding:12px 16px
    border:1px solid #f5c6c6
    border-radius:8px
    background:#fff6f6
    color:#d94848
    font-size:14px
    line-height:1.5

  .drugApplyC .insufficientTable
    width:100%
    margin:0

  @media (max-width: 900px)
    .drugApplyC .apply-form
      grid-template-columns:repeat(2, minmax(0, 1fr))

  @media (max-width: 600px)
    .drugApplyC .apply-form
      grid-template-columns:minmax(0, 1fr)

      .radio-p
        flex-wrap:wrap
        gap:12px

      .submit
        flex-wrap:wrap
</style>
