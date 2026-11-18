<template>
  <div class="turnOver">
    <h1 class="listing-page-title">Movimiento de personal de enfermería</h1>
    <div class="replyBtn">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">Añadir baja de personal</el-button>
    </div>
    <el-table
    :data="table"
    stripe
    style="width: 100%">
    <el-table-column type="expand" width="48">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="Nombre:">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="Edad:">
            <span>{{ props.row.age }}</span>
          </el-form-item>
          <el-form-item label="Sexo:">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
           <el-form-item label="Lugar de origen:">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="Antigüedad:">
            <span>{{ props.row.seniority }}</span>
          </el-form-item>
          <el-form-item label="Departamento:">
            <span>{{ props.row.department }}</span>
          </el-form-item> 
          <el-form-item label="N.º de empleado:">
            <span>{{ props.row.number }}</span>
          </el-form-item>                  
          <el-form-item label="Fecha de ingreso:">
            <span>{{ props.row.hiredate }}</span>
          </el-form-item>
          <el-form-item label="Fecha de baja:">
            <span>{{ props.row.resignation_time }}</span>
          </el-form-item>          
          <el-form-item label="Motivo de la baja:">
            <span>{{ props.row.resignation_reason }}</span>
          </el-form-item>
          <el-form-item label="Cargo:">
            <span>{{ props.row.position }}</span>
          </el-form-item>
          <el-form-item label="Tramitado por:">
            <span>{{ props.row.processor }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="N.º" width="64">
      <template slot-scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column label="Nombre" prop="name" min-width="130" show-overflow-tooltip></el-table-column>
    <el-table-column label="N.º de empleado" prop="number" min-width="140"></el-table-column>
    <el-table-column label="Departamento" prop="department" min-width="140" show-overflow-tooltip></el-table-column>
    <el-table-column label="Tramitado por" prop="processor" min-width="140" show-overflow-tooltip></el-table-column>
    <el-table-column align="center" label="Acciones" width="110" class-name="turnover-actions-column">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="Añadir registro de movimiento de personal" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="Nombre">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Edad">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="Sexo">
            <el-radio-group v-model="form.sex">
              <el-radio label="Hombre"></el-radio>
              <el-radio label="Mujer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Departamento">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="Lugar de origen">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="Antigüedad">
            <el-input v-model="form.seniority"></el-input>
          </el-form-item>
          <el-form-item label="N.º de empleado">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="Cargo">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
           <el-form-item label="Fecha de ingreso">
            <el-input v-model="form.hiredate"></el-input>
          </el-form-item>
           <el-form-item label="Fecha de baja">
            <el-input v-model="form.resignation_time"></el-input>
          </el-form-item>
           <el-form-item label="Motivo de la baja">
            <el-input v-model="form.resignation_reason"></el-input>
          </el-form-item>
          <el-form-item label="Tramitado por">
            <el-input v-model="form.processor"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleCreateSubmit">Aceptar</el-button>
          <el-button type="primary" @click="resetForm('form')">Restablecer</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        table: [],
        dialogFormVisible: false,
        form: {
          name: '',
          age: '',
          sex: '',
          department: '',
          address: '',
          seniority: '',
          number: '',
          position: '',
          processor: '',
          hiredate: '',
          resignation_time: '',
          resignation_reason: ''
        }
      };
    },
    methods: {
      handleCreate () {
        this.dialogFormVisible = true;
        this.formClear();
      },
      handleCreateSubmit () {
        let vm = this;
        vm.table.push(vm.form);
        this.dialogFormVisible = false;
        this.$message({
          message: '¡Añadido correctamente!',
          type: 'success'
        });
      },
      formClear () {
        this.form = {
          name: '',
          age: '',
          sex: '',
          department: '',
          address: '',
          seniority: '',
          number: '',
          position: '',
          processor: '',
          hiredate: '',
          resignation_time: '',
          resignation_reason: ''
        };
      },
      resetForm () {
        this.form = {
          name: '',
          age: '',
          sex: '',
          department: '',
          address: '',
          seniority: '',
          number: '',
          position: '',
          processor: '',
          hiredate: '',
          resignation_time: '',
          resignation_reason: ''
        };
      },
      handleDelete (index, row) {
        let vm = this;
        vm.table.splice(index, 1);
        this.$message({
          message: '¡Eliminado correctamente!',
          type: 'success'
        });
      }
    },
    created () {
      this.$http.get(api.turnOver).then((response) => {             // mark
        this.table = response.body.table;
      }, response => {
        // error callback
        this.$message({
          message: 'Error al solicitar los datos',
          type: 'error'
        });
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .turnOver
    .replyBtn
      justify-content:flex-end
      margin-bottom:16px
      padding:10px 14px

    .demo-table-expand
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      gap:8px 20px
      padding:8px 16px

      .el-form-item
        display:flex
        min-width:0
        margin:0

      .el-form-item__label
        width:auto !important
        color:#657b8d
        font-weight:600
        white-space:nowrap

      .el-form-item__content
        min-width:0
        overflow-wrap:anywhere

    .turnover-actions-column .cell
      padding:8px

  @media (max-width: 700px)
    .turnOver
      .demo-table-expand
        grid-template-columns:minmax(0, 1fr)
</style>