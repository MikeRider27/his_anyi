<template>
  <div class="addTrashy">
    <h1 class="form-page-title">Registrar medicamento consumido</h1>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules">
      <el-form-item label="Nombre del medicamento" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Cantidad" prop="amount">
        <el-input v-model.trim.number="form.amount" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Persona que confirma" prop="handlers">
        <el-input v-model.trim="form.handlers"></el-input>
      </el-form-item>
      <el-form-item label="Motivo" prop="trashy">
        <el-input v-model.trim="form.trashy" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Proveedor"  prop="manufacturers">
        <el-input v-model.trim="form.manufacturers"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Añadir</el-button>
        <el-button @click="goback">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import {api} from '../../../../global/api.js';
  export default {
    data () {
      return {
        form: {
          name: '',
          amount: '',
          handlers: '',
          trashy: '',
          manufacturers: ''
        },
        // Define form validation rules
        rules: {
          name: [
            { required: true, message: 'Introduzca el nombre del medicamento', trigger: 'blur' }
          ],
          handlers: [
            { required: true, message: 'Introduzca quién confirma', trigger: 'blur' }
          ],
          manufacturers: [
            { required: true, message: 'Introduzca el proveedor', trigger: 'blur' }
          ],
          trashy: [
            { required: true, message: 'Introduzca el motivo de la baja', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // Submit the added info
      onSubmit () {
        this.$http.get(api.Storage, {params: {form: this.form}}).then(function (response) {
          this.$message({
            message: 'Información añadida correctamente',
            type: 'success'
          });
          history.go(-1);
        }, function () {
          this.$message.error('Error en la API del backend, ¡corríjala!');
        });
      },
      // Back
      goback () {
        history.go(-1);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addTrashy
    max-width:850px
</style>
