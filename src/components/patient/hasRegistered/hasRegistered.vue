<template>
  <div class="hasRegistered">
    <h1 class="listing-page-title">Pacientes con cita registrada</h1>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Palabra clave" class="appointment-search-input"></el-input>
      <el-select v-model="listQuery.select" placeholder="Tipo" class="appointment-search-type">
        <el-option label="Número" value="1"></el-option>
        <el-option label="Nombre" value="2"></el-option>
        <el-option label="Fecha" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">Buscar</el-button>
    </div>
    <el-table :data="tableData" border stripe class="appointment-table">
      <el-table-column type="expand" width="52" class-name="appointment-expand-control">
        <template slot-scope="props">
          <div class="appointment-details">
            <div><strong>Fecha:</strong><span>{{ props.row.date }}</span></div>
            <div><strong>Número:</strong><span>{{ props.row.number }}</span></div>
            <div><strong>Nombre:</strong><span>{{ props.row.name }}</span></div>
            <div><strong>Edad:</strong><span>{{ props.row.age }}</span></div>
            <div><strong>Teléfono de contacto:</strong><span>{{ props.row.phone }}</span></div>
            <div><strong>Síntomas:</strong><span>{{ props.row.symptoms }}</span></div>
            <div><strong>Clasificación:</strong><span>{{ props.row.disease }}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Fecha" prop="date" min-width="130"></el-table-column>
      <el-table-column label="Número" prop="number" min-width="130"></el-table-column>
      <el-table-column label="Nombre" prop="name" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column label="Edad" prop="age" width="80"></el-table-column>
      <el-table-column label="Teléfono de contacto" prop="phone" min-width="170"></el-table-column>
      <el-table-column label="Ubicación del departamento" prop="position" min-width="220" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import {api} from '../../../global/api.js';
export default {
  data () {
    return {
      tableData: [],
      listQuery: {
        select: '',
        title: ''
      }
    };
  },
  created () {
    let me = this;
    Vue.http.get(api.patientList).then(function (response) {
      me.tableData = response.data.tableData;
    }, function (response) {
      me.$message.error('No se pudo cargar la lista de citas. Inténtalo de nuevo más tarde.');
    });
  },
  methods: {
    handleSearch () {
      let me = this;
      Vue.http.get(api.patientList1, {params: this.listQuery}).then(function (response) {
        // me.tableData = response.data.tableData;
        me.tableData = response.data.tableData;
      }, function (response) {
        me.$message.error('No se pudo realizar la búsqueda. Inténtalo de nuevo más tarde.');
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .hasRegistered
    .filter-container
      .appointment-search-input
        flex:1 1 190px
        max-width:260px

      .appointment-search-type
        flex:0 1 170px

    .appointment-table
      width:100%

      .appointment-expand-control
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

    .appointment-details
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
    .hasRegistered .appointment-details
      grid-template-columns:repeat(2, minmax(0, 1fr))
</style>