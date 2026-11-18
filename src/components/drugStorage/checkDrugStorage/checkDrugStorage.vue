<template>
  <div class="drug">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="Introduzca datos del medicamento">
        <el-input v-model="selectInformation" placeholder="Introduzca datos del medicamento"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectFn">Consultar</el-button>
      </el-form-item>
      <p class="tips">
        <i>Temperatura de almacenamiento: 01-ambiente, 02-refrigerado</i><br>
        <i>Forma de compra: 01-pedido en línea, 02-compra al fabricante</i>
      </p>
    </el-form>
    <template v-if="selectArr.length">
      <h2 class="title">Resultados</h2>
      <el-table :data="selectArr" class="storage-table" stripe>
        <el-table-column type="expand" width="52" class-name="expand-control">
          <template slot-scope="props">
            <div class="storage-row-details">
              <div><strong>Fabricante:</strong><span>{{ props.row.manufacturers }}</span></div>
              <div><strong>Tipo:</strong><span>{{ props.row.species }}</span></div>
              <div><strong>Fecha de fabricación:</strong><span>{{ props.row.productionData }}</span></div>
              <div><strong>Presentación:</strong><span>{{ props.row.specification }}</span></div>
              <div><strong>Forma farmacéutica:</strong><span>{{ props.row.dosageForm }}</span></div>
              <div><strong>Precio unitario:</strong><span>{{ props.row.unitPrice }}</span></div>
              <div><strong>Temperatura de almacenamiento:</strong><span>{{ props.row.temperature }}</span></div>
              <div><strong>Responsable:</strong><span>{{ props.row.handlers }}</span></div>
              <div><strong>Control de calidad:</strong><span>{{ props.row.qualityOfficer }}</span></div>
              <div><strong>Almacenero:</strong><span>{{ props.row.warehouseman }}</span></div>
              <div><strong>Forma de entrada:</strong><span>{{ props.row.pattern }}</span></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="N.º" width="70"></el-table-column>
        <el-table-column prop="name" label="Nombre del medicamento" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount" label="Cantidad" width="110"></el-table-column>
        <el-table-column prop="date2" label="Fecha de entrada" min-width="170"></el-table-column>
      </el-table>
    </template>
    <template>
      <h2 class="title">Todos los medicamentos</h2>
      <el-table :data="drug" class="storage-table" stripe>
        <el-table-column type="expand" width="52" class-name="expand-control">
          <template slot-scope="props">
            <div class="storage-row-details">
              <div><strong>Fabricante:</strong><span>{{ props.row.manufacturers }}</span></div>
              <div><strong>Tipo:</strong><span>{{ props.row.species }}</span></div>
              <div><strong>Fecha de fabricación:</strong><span>{{ props.row.productionData }}</span></div>
              <div><strong>Presentación:</strong><span>{{ props.row.specification }}</span></div>
              <div><strong>Forma farmacéutica:</strong><span>{{ props.row.dosageForm }}</span></div>
              <div><strong>Precio unitario:</strong><span>{{ props.row.unitPrice }}</span></div>
              <div><strong>Temperatura de almacenamiento:</strong><span>{{ props.row.temperature }}</span></div>
              <div><strong>Responsable:</strong><span>{{ props.row.handlers }}</span></div>
              <div><strong>Control de calidad:</strong><span>{{ props.row.qualityOfficer }}</span></div>
              <div><strong>Almacenero:</strong><span>{{ props.row.warehouseman }}</span></div>
              <div><strong>Forma de entrada:</strong><span>{{ props.row.pattern }}</span></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="N.º" width="70"></el-table-column>
        <el-table-column prop="name" label="Nombre del medicamento" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount" label="Cantidad" width="110"></el-table-column>
        <el-table-column prop="date2" label="Fecha de entrada" min-width="170"></el-table-column>
      </el-table>
      <div class="pageBlock">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 100, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalInformation>
        </el-pagination>
      </div>
  </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        temperatures: ['Ambiente', 'Refrigerado'],
        currentPage: 4,
        nowpage: 1,
        handleSize: 10,
        selectInformation: '',
        drug: [],
        selectArr: [],
        totalInformation: 0
      };
    },
    created () {
      // Fetch drug info
      this.$http.get(api.Storage).then((response) => {             // mark
        this.drug = response.body.drug;
        // Total record count
        this.totalInformation = response.body.total;
      }, response => {
        this.$message.error('Error al solicitar los datos');
      });
    },
    methods: {
      selectFn () {
        this.$message({
          message: 'Se envía al backend lo introducido por el usuario: ' + this.selectInformation,
          type: 'success'
        });
        this.$http.get(api.Storage, {params: {selectInformation: this.selectInformation}}).then(function (response) {
          this.selectArr = response.body.drug;
        }, function () {
          this.$message.error('Error en la API del backend, ¡corríjala!');
        });
      },
      handleSizeChange (val) {
        this.handleSize = val;
      },
      handleCurrentChange (val) {
        const showindex = [val, this.handleSize, this.drug[this.drug.length - 1].id];
        this.$message({
          message: 'Se envía al backend la página, registros por página y posición actual:id ' + showindex,
          type: 'success'
        });
        this.$http.get(api.Storage, {params: {showindex: showindex}}).then(function (response) {
          this.drug = response.body.drug;
          // Total record count
          this.totalInformation = response.body.total;
        }, function () {
//          this.$message.error('Backend API error, fix the backend API!');
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.drug
  .title
    padding:10px 0
    margin:30px 0 10px 0

  .storage-table
    width:100%
    margin-bottom:30px

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

  .storage-row-details
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

  .pageBlock
    text-align:center
  .tips
    text-align: left
    float:right
    font-size:13px
    line-height:15px
    padding-top:60px

@media (max-width: 700px)
  .drug .storage-row-details
    grid-template-columns:repeat(2, minmax(0, 1fr))
</style>
