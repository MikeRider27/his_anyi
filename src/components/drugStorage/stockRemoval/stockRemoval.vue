<template>
  <div class="stockRemoval">
    <h1 class="listing-page-title">Salidas de medicamentos</h1>
    <el-table :data="drug" stripe class="stock-removal-table">
      <el-table-column type="expand" width="52" class-name="expand-control">
        <template slot-scope="props">
          <div class="stock-removal-details">
            <div><strong>Fabricante:</strong><span>{{ props.row.manufacturers }}</span></div>
            <div><strong>Nombre del medicamento:</strong><span>{{ props.row.name }}</span></div>
            <div><strong>Cantidad:</strong><span>{{ props.row.amount }}</span></div>
            <div><strong>Repartidor:</strong><span>{{ props.row.handlers }}</span></div>
            <div><strong>Fecha de solicitud:</strong><span>{{ props.row.timeApplication }}</span></div>
            <div><strong>Fecha de entrega:</strong><span>{{ props.row.outOfTime || 'Pendiente' }}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre del medicamento" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount" label="Cantidad" width="100"></el-table-column>
      <el-table-column prop="handlers" label="Repartidor" min-width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="timeApplication" label="Fecha de solicitud" min-width="165"></el-table-column>
      <el-table-column prop="outOfTime" label="Fecha de entrega" min-width="165">
        <template slot-scope="scope">
          <span>{{ scope.row.outOfTime || 'Pendiente' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Acciones" width="115" align="center">
        <template prop="outOfTime" slot-scope="scope">
          <el-button v-if="!scope.row.outOfTime" size="mini" @click="handleChange(scope.$index, scope.row)" type="danger">Entregar</el-button>
          <el-button v-else class="handleOut" size="mini" disabled>Entregado</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        drug: []
      };
    },
    created () {
      // Fetch all delivery records
      this.$http.get(api.stockRemoval).then((response) => {             // mark
        this.drug = response.body.drug;
      }, response => {
      // error callback
        this.$message({
          message: 'Error al solicitar los datos',
          type: 'error'
        });
      });
    },
    methods: {
      // Click to mark as delivered
      handleChange (index, row) {
        // Get the current time and convert its format
        let time = new Date();
        this.drug[index].outOfTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        this.$http.get(api.stockRemoval, {params: {id: this.drug[index].id, outOfTime: this.drug[index].outOfTime}}).then(function (response) {
          this.$message({
            message: 'Información añadida correctamente',
            type: 'success'
          });
        }, function () {
          this.$message.error('Error en la API del backend, ¡corríjala!');
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.stockRemoval
  .stock-removal-table
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

  .stock-removal-details
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

  .handleOut
    cursor:no-drop
    &:hover,&:focus
      color:#1f2d3d
      border-color:#c4c4c4

@media (max-width: 700px)
  .stockRemoval .stock-removal-details
    grid-template-columns:repeat(2, minmax(0, 1fr))
</style>
