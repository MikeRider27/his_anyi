<template>
  <div class="putInStorage">
    <h1 class="form-page-title">Entrada de medicamentos al almacén</h1>
    <el-form ref="form" :model="form" :rules="rules" label-position="top" class="storage-entry-form">
      <el-form-item label="Nombre del medicamento" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Cantidad" prop="amount">
        <el-input v-model.trim.number="form.amount" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Fecha de entrada" class="entry-date-item">
        <div class="entry-date-fields">
          <el-date-picker type="date" placeholder="Seleccione una fecha" v-model="date1"></el-date-picker>
          <span class="date-separator">a las</span>
          <el-time-picker type="fixed-time" placeholder="Seleccione la hora" v-model="form.date2"></el-time-picker>
        </div>
      </el-form-item>
      <el-form-item label="Fabricante" prop="manufacturers">
        <el-input v-model.trim="form.manufacturers" ></el-input>
      </el-form-item>
      <el-form-item label="Tipo" prop="species">
        <el-input v-model.trim="form.species"></el-input>
      </el-form-item>
      <el-form-item label="Fecha de fabricación">
        <el-date-picker readOnly="true" type="date" placeholder="Seleccione una fecha" v-model="form.productionData" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="Presentación"  prop="specification">
        <el-input v-model.trim="form.specification"></el-input>
      </el-form-item>
      <el-form-item label="Forma farmacéutica"  prop="dosageForm">
        <el-input v-model.trim="form.dosageForm"></el-input>
      </el-form-item>
      <el-form-item label="Precio unitario"  prop="unitPrice">
        <el-input v-model.trim.number="form.unitPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Precio total" class="total-price-field">
        {{form.totalPrices}}
      </el-form-item>
      <el-form-item label="Temperatura de almacenamiento"  prop="temperature">
        <el-select v-model.trim="form.temperature" placeholder="Seleccione la temperatura de almacenamiento">
          <el-option label="Ambiente" value="01"></el-option>
          <el-option label="Refrigerado" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Responsable"  prop="handlers">
        <el-input v-model.trim="form.handlers"></el-input>
      </el-form-item>
      <el-form-item label="Control de calidad"  prop="qualityOfficer">
        <el-input v-model.trim="form.qualityOfficer"></el-input>
      </el-form-item>
      <el-form-item label="Almacenero"  prop="warehouseman">
        <el-input v-model.trim="form.warehouseman"></el-input>
      </el-form-item>
      <el-form-item label="Forma de entrada"  prop="pattern">
        <el-select v-model.trim="form.pattern" placeholder="Seleccione la forma de entrada">
          <el-option label="Pedido en línea" value="01"></el-option>
          <el-option label="Compra al fabricante" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-actions">
        <el-button type="primary" @click="submitForm('form')">Entrada de medicamentos</el-button>
        <el-button @click="resetForm('form')">Restablecer</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        date1: '',
        form: {
          name: '',
          manufacturers: '',
          amount: '',
          unitPrice: '',
          totalPrices: 0,
          temperature: '',
          handlers: '',
          qualityOfficer: '',
          warehouseman: '',
          pattern: '',
          date2: '',
          species: '',
          productionData: '',
          specification: '',
          dosageForm: ''
        },
        // Form validation
        rules: {
          name: [
            { required: true, message: 'Introduzca el nombre del medicamento', trigger: 'blur' }
          ],
          manufacturers: [
            { required: true, message: 'Introduzca el fabricante', trigger: 'blur' }
          ],
          species: [
            { required: true, message: 'Introduzca el tipo de medicamento', trigger: 'blur' }
          ],
          specification: [
            { required: true, message: 'Introduzca la presentación', trigger: 'blur' }
          ],
          dosageForm: [
            { required: true, message: 'Introduzca la forma farmacéutica', trigger: 'blur' }
          ],
          handlers: [
            { required: true, message: 'Introduzca el responsable', trigger: 'blur' }
          ],
          qualityOfficer: [
            { required: true, message: 'Introduzca el control de calidad', trigger: 'blur' }
          ],
          warehouseman: [
            { required: true, message: 'Introduzca el almacenero', trigger: 'blur' }
          ],
          pattern: [
            { required: true, message: 'Introduzca la forma de entrada', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // Submit incoming drug datavue-resource
      submitForm () { // mark
        if (!this.form.name || !this.form.manufacturers || !this.form.amount || !this.form.unitPrice || !this.form.temperature || !this.form.handlers || !this.form.qualityOfficer || !this.form.warehouseman || !this.form.pattern || !this.form.date2 || !this.form.species || !this.form.productionData || !this.form.specification || !this.form.dosageForm) {
          this.$message.error('¡No puede estar vacío!');
        } else {
          // Convert date format
          this.form.date2 = this.form.date2.getFullYear() + '-' + this.form.date2.getMonth() + '-' + this.form.date2.getDay() + ' ' + this.form.date2.getHours() + ':' + this.form.date2.getMinutes() + ':' + this.form.date2.getSeconds();
          this.form.productionData = this.form.productionData.getFullYear() + '-' + this.form.productionData.getMonth();
          this.$message({
            message: 'Se envía al backend el objeto editado por el usuario:' + JSON.stringify(this.form),
            type: 'success'
          });
          this.$http.get(api.putInStorage, {params: {form: this.form}}).then(function (response) {
            this.resetForm();
          }, function () {
            this.$message.error('POSTmétodo: error en la API del backend, ¡corríjala!');
            this.resetForm();
          });
        }
      },
      // Reset the input form
      resetForm () {
        this.date1 = '';
        this.form = {
          name: '',
          manufacturers: '',
          amount: '',
          unitPrice: '',
          totalPrices: 0,
          temperature: '',
          handlers: '',
          qualityOfficer: '',
          warehouseman: '',
          pattern: '',
          date1: '',
          date2: '',
          species: '',
          productionData: '',
          specification: '',
          dosageForm: ''
        };
      }
    },
    computed: {
      Amount () {
        return this.form.amount;
      },
      UnitPrice () {
        return this.form.unitPrice;
      }
    },
    watch: {
      // Unit price or quantity changed -- recalculate total
      Amount (newValue, oldValue) {
        this.form.totalPrices = this.form.amount * this.form.unitPrice;
      },
      UnitPrice (newValue, oldValue) {
        this.form.totalPrices = this.form.amount * this.form.unitPrice;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .putInStorage
    max-width:100%

    .storage-entry-form
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      gap:16px 24px

      .el-form-item
        min-width:0
        margin:0

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

      .entry-date-item,
      .form-actions
        grid-column:1 / -1

      .entry-date-fields
        display:flex
        align-items:center
        gap:12px

        .el-date-editor
          flex:1 1 0
          min-width:0

        .date-separator
          flex:0 0 auto
          color:#718394

      .total-price-field .el-form-item__content
        box-sizing:border-box
        min-height:40px
        padding:10px 12px
        border:1px solid #e4ebef
        border-radius:8px
        background:#f8fafb
        color:#263b4d
        font-weight:600
        line-height:18px

      .form-actions .el-form-item__content
        display:flex
        justify-content:center
        gap:10px
        margin-top:8px

  @media (max-width: 700px)
    .putInStorage .storage-entry-form
      grid-template-columns:minmax(0, 1fr)

      .entry-date-fields
        align-items:stretch
        flex-direction:column

      .entry-date-fields .date-separator
        align-self:flex-start
</style>
