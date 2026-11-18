<template>
  <div class="trashyDrug">
    <h1 class="listing-page-title">Medicamentos consumidos</h1>
    <el-popover ref="popover5" placement="top" width="160" v-model="tipsVisible">
      <p>¿Seguro que desea eliminar todo?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="deleteAll(false)">Cancelar</el-button>
        <el-button type="primary" size="mini" @click="deleteAll(true)">Aceptar</el-button>
      </div>
    </el-popover>
    <div class="headerBt">
      <router-link to="addTrashy"><el-button size="small">Añadir consumo</el-button></router-link>
      <el-button size="small" type="danger"  v-popover:popover5>Eliminar todo</el-button>
    </div>
    <el-table :data="trashyDrug" stripe class="consumed-medicine-table">
      <el-table-column type="expand" width="52" class-name="expand-control">
        <template slot-scope="props">
          <div class="consumed-medicine-details">
            <div><strong>Nombre del medicamento:</strong><span>{{ props.row.name }}</span></div>
            <div><strong>Cantidad:</strong><span>{{ props.row.amount }}</span></div>
            <div><strong>Responsable:</strong><span>{{ props.row.handlers }}</span></div>
            <div><strong>Motivo:</strong><span>{{ props.row.trashy }}</span></div>
            <div><strong>Fabricante:</strong><span>{{ props.row.manufacturers }}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre del medicamento" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount" label="Cantidad" width="110"></el-table-column>
      <el-table-column prop="handlers" label="Responsable" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="trashy" label="Motivo" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column label="Acciones" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Editar medicamento consumido" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>
      <el-form :model="editForm">
        <el-form-item label="Nombre del medicamento">
          <el-input v-model.trim="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Cantidad">
          <el-input v-model.trim.number="editForm.amount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Persona que confirma">
          <el-input v-model.trim="editForm.handlers"></el-input>
        </el-form-item>
        <el-form-item label="Motivo">
          <el-input v-model.trim="editForm.trashy"></el-input>
        </el-form-item>
        <el-form-item label="Proveedor">
          <el-input v-model.trim="editForm.manufacturers"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="toEditTrashy">Aceptar</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        trashyDrug: [],
        tipsVisible: false,
        dialogFormVisible: false,
        editIndex: '',
        editForm: {
          id: '',
          name: '',
          manufacturers: '',
          amount: '',
          handlers: '',
          trashy: ''
        }
      };
    },
    created () {
      // Fetch all wasted drug records
      this.$http.get(api.trashy).then((response) => {             // mark
        this.trashyDrug = response.body.trashyDrug;
      }, response => {
        // error callback
        this.$message('Error al solicitar los datos');
      });
    },
    methods: {
      // Edit one record
      handleEdit (index, row) {
        this.editIndex = index;
        this.editForm = this.trashyDrug[index];
        this.dialogFormVisible = true;
      },
      // Delete one record by id
      handleDelete (index, row) {
        // mark Actually, POST should be used to send the data
        this.$message({
          message: 'Se envía al backend el mensaje con id' + this.trashyDrug[index].id,
          type: 'success'
        });
        this.$http.get(api.Storage, {params: {id: this.trashyDrug[index].id}}).then(function (response) {
          this.trashyDrug.splice(index, 1);
        }, function () {
          this.$message.error('Error en la API del backend, ¡corríjala!');
        });
      },
      // Delete all records
      deleteAll (toDelete) {
        this.tipsVisible = false;
        if (toDelete) {
          this.$message('Eliminar todo');
          this.$http.get(api.trashy).then(function (response) {
            this.trashyDrug = [];
          }, function () {
            this.$message.error('Error en la API del backend, ¡corríjala!');
          });
        }
      },
      // Send the user-edited data
      toEditTrashy () {
        this.$http.get(api.trashy, {params: {form: this.editForm}}).then(function (response) {
          this.$message({
            message: 'Medicamento consumido editado correctamente',
            type: 'success'
          });
          this.trashyDrug[this.editIndex] = this.editForm;
          this.dialogFormVisible = false;
        }, function () {
          this.$message.error('Error en la API del backend, ¡corríjala!');
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .trashyDrug
    .headerBt
      margin-bottom:20px

    .consumed-medicine-table
      width:100%

      .expand-control
        .el-table__expand-icon
          width:24px
          height:24px
          border:1px solid #d5e0e7
          border-radius:50%
          color:#167d77
          transform:none

          .el-icon-arrow-right
            display:none

          &::before
            content:"+"
            font-size:18px
            font-weight:600
            line-height:20px

        .el-table__expand-icon--expanded::before
          content:"−"

    .consumed-medicine-details
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:12px 20px
      padding:8px 20px

      > div
        display:flex
        flex-direction:column
        min-width:0
        gap:4px

      strong
        color:#40566a
        font-size:12px

      span
        overflow-wrap:anywhere
        color:#526779

@media (max-width: 700px)
  .trashyDrug .consumed-medicine-details
    grid-template-columns:repeat(2, minmax(0, 1fr))
</style>
