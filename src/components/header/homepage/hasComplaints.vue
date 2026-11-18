<template>
  <div class="hasComplaints">
    <h1 class="listing-page-title">Quejas recibidas por el hospital</h1>
    <el-table :data="tableData" border stripe class="complaints-table">
      <el-table-column type="expand" width="52" class-name="complaints-expand-control">
        <template slot-scope="props">
          <div class="complaints-details">
            <div><strong>Fecha de la queja:</strong><span>{{ props.row.date }}</span></div>
            <div><strong>Teléfono del reclamante:</strong><span>{{ props.row.phone }}</span></div>
            <div><strong>Nombre del reclamante:</strong><span>{{ props.row.name }}</span></div>
            <div><strong>Contenido de la queja:</strong><span>{{ props.row.content }}</span></div>
            <div><strong>Departamento/personal implicado:</strong><span>{{ props.row.department }}</span></div>
            <div><strong>Vía de la queja:</strong><span>{{ props.row.way }}</span></div>
            <div><strong>Estado de tramitación:</strong><span>{{ props.row.Processing }}</span></div>
            <div><strong>Resolución final:</strong><span>{{ props.row.results }}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Fecha" prop="date" min-width="125"></el-table-column>
      <el-table-column label="Reclamante" prop="name" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column label="Departamento/personal implicado" prop="department" min-width="190" show-overflow-tooltip></el-table-column>
      <el-table-column label="Contenido de la queja" prop="content" min-width="280" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import {api} from '../../../global/api.js';
export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {
    let me = this;
    Vue.http.get(api.complaints).then(function (response) {
      me.tableData = response.data.tableData;
    }, function (response) {
      me.$message.error('No se pudo cargar la información de quejas. Inténtalo de nuevo más tarde.');
    });
  }
  // methods: {
  //   getRegisteredData () {
  //     let me = this;
  //     Vue.http.get(api./patientList).then(function (response) {
  //       me.tableData = response.data.tableData;
  //     }, function (response) {
  //     });
  //   }
  // }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .hasComplaints
    .complaints-table
      width:100%

      .complaints-expand-control
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

    .complaints-details
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
    .hasComplaints .complaints-details
      grid-template-columns:repeat(2, minmax(0, 1fr))
</style>